package global_services.text_posts;

import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import database_connector.databaseConnector;
import security_service.uniqueKey;
import database_connector.databaseConnector;



public class textPostSetter extends HttpServlet
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
			String thPost = postData.get("userpost").toString();
			String email = postData.get("email").toString();
			System.out.println("userpost - >"+thPost);
			System.out.println("user email -> "+email);
			if(thPost == null && email == null){

				sendResponse(response, "cannotpost");
			}
			else{
				String postid = new uniqueKey().getKey(email + thPost);
				System.out.println("Post key -> "+postid);
				databaseConnector dataBaseObject = new databaseConnector();
				Connection dataBaseInstance = dataBaseObject.getDataDatabase();
				PreparedStatement pstmt = dataBaseInstance.prepareStatement("INSERT INTO TextPosts values(?,?,?,?,?)");  
				pstmt.setString(1,postid);
				pstmt.setString(2,thPost);
				pstmt.setString(3,email);
				pstmt.setString(4, getUsersName(email));
				pstmt.setString(5,(java.time.LocalDate.now()).toString());
				pstmt.executeUpdate();
				pstmt.close();
				dataBaseObject.closeDataBase(dataBaseInstance);
				System.out.println("Posts inserted");
				sendResponse(response, "posteddata");
			}
		}
		catch(Exception e){
			System.out.println("Post not inserted");
			sendResponse(response, "cannotpost");
			System.out.println("Exception from postsSetter -> "+e);
		}	
	}			
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		doGet(request,response);
	}	
	
}


