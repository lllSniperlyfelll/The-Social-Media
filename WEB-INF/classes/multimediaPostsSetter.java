package global_services.multimedia_posts;

import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import database_connector.databaseConnector;
import security_service.uniqueKey;


public class multimediaPostsSetter extends HttpServlet
{
	private JSONObject getJson(HttpServletRequest request){
		try{
			StringBuffer rawJsonData = new StringBuffer();
			String line="";
			BufferedReader br = request.getReader();
			while( (line = br.readLine()) != null){
				rawJsonData.append(line);
			}
			JSONParser parseObject = new JSONParser();
			return (JSONObject) parseObject.parse(rawJsonData.toString());  
		}
		catch(Exception e){
			System.out.println(e);
		}
		return new JSONObject();
	}

	private void sendResponse(HttpServletResponse response, String toWrite){
		try{
			response.setContentType("application/json");
			PrintWriter pw = response.getWriter();
			JSONObject responseObj = new JSONObject();
			responseObj.put("posted_status",toWrite);
			System.out.println(responseObj);
			pw.println(responseObj);
			pw.flush();
		}
		catch(Exception e){
			System.out.println(e);
		}	
	}

	private String getUsersName(String email){
		databaseConnector dataBaseObject = new databaseConnector();
		Connection dataBaseInstance = dataBaseObject.getDataDatabase();
		try{
			Statement stmt = dataBaseInstance.createStatement();
			String query="SELECT Name from registeredusers where Email="+ ("'"+email+"'");
		    ResultSet userResultSet=stmt.executeQuery(query);
		    while(userResultSet.next()){
			   	return userResultSet.getString("Name");
			}
		}catch(Exception e){
			System.out.println("Exception at textPostSetter while getting name -> "+e);
		}
		finally{
			dataBaseObject.closeDataBase(dataBaseInstance);
		}
		return null;
	}

	public void doGet(HttpServletRequest request,HttpServletResponse response)
	{
		try{
			System.out.println("Called postsSetter");
			JSONObject postData= getJson(request);
			String img_path = "na";
			String tags = "na";
			String caption = "na";
			String email = "na";
			email = postData.get("email").toString();
			img_path = postData.get("imagePath").toString();
			tags = postData.get("imageTags").toString();
			caption = postData.get("caption").toString();


	/*		img_path = "C:/Users/user/Pictures/"+img_path;*/
			img_path = "./images/"+img_path;

			if( (img_path.equals("na")  || tags.equals("na")  || caption.equals("na") ) ||  email == null || email.equals("na")){
				sendResponse(response, "cannotpost");
			}
			else{

				String postid = new uniqueKey().getKey(email + img_path);
				System.out.println("Post key -> "+postid);
				databaseConnector dataBaseObject = new databaseConnector();
				Connection dataBaseInstance = dataBaseObject.getDataDatabase();
				PreparedStatement pstmt = dataBaseInstance.prepareStatement("INSERT INTO MultiMediaPosts values(?,?,?,?,?,?,?)");  
				pstmt.setString(1,postid);
				pstmt.setString(2,img_path);
				pstmt.setString(3,caption);
				pstmt.setString(4,tags);
				pstmt.setString(5,email);
				pstmt.setString(6,getUsersName(email));
				pstmt.setString(7,(java.time.LocalDate.now()).toString());
				pstmt.executeUpdate();
				pstmt.close();
				dataBaseObject.closeDataBase(dataBaseInstance);
				System.out.println("Posts inserted");
				sendResponse(response, "Post_Successfull");
			}
		}
		catch(Exception e){
			System.out.println("Post not inserted");
			sendResponse(response, "Cannot_Post");
			System.out.println("Exception from postsSetter -> "+e);
		}	
	}			
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		doGet(request,response);
	}			
}
	