package global_services.comments_handler;

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


/*
Request ->
1. email
2. comment
3. postid
*/


/* what to store in comments table
1. postid
2. email
3. name
4. Comment*/

/* Table name will be the CommentsTable*/

public class commentsHandler extends HttpServlet
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
			responseObj.put("comment_status",toWrite);
			System.out.println(responseObj);
			pw.println(responseObj);
			pw.flush();
		}
		catch(Exception e){
			System.out.println(e);
		}	
	}


	private String getUsersName(String email){
		try{
			databaseConnector dataBaseObject = new databaseConnector();
			Connection dataBaseInstance = dataBaseObject.getDataDatabase();
			Statement stmt = dataBaseInstance.createStatement();
			String query="SELECT Name from registeredusers where Email="+ ("'"+email+"'");
		    ResultSet userResultSet=stmt.executeQuery(query);
		    while(userResultSet.next()){

			   	return userResultSet.getString("Name");
			}
		}catch(Exception e){

			System.out.println("Exception at commentsHandler while getting name -> "+e);
		}
		return null;
	}


	private boolean checkTableExists(String tableName){

		try{
			databaseConnector dataBaseObject = new databaseConnector();
			Connection dataBaseInstance = dataBaseObject.getCommentsdb();
			DatabaseMetaData meta = dataBaseInstance.getMetaData();
			ResultSet tables = meta.getTables(null, null, tableName, null);
			if(tables.next())
				return true;
			return false;
		}catch(Exception e){
			System.out.println("Error in checking table avaliability in comments Handler -> "+e);
		}
		return false;
	}



	private boolean pushData(String tableName, String data[]){
			databaseConnector dataBaseObject = new databaseConnector();
			Connection dataBaseInstance = dataBaseObject.getCommentsdb();
		try{
			PreparedStatement pstmt = dataBaseInstance.prepareStatement("INSERT INTO "+tableName+" values(?,?,?,?)");  
			pstmt.setString(1,data[0]);
			pstmt.setString(2,data[1]);
			pstmt.setString(3,getUsersName(data[1]));
			pstmt.setString(4, data[2]);
			pstmt.executeUpdate();
			pstmt.close();
			dataBaseObject.closeDataBase(dataBaseInstance);
			System.out.println("Comment inserted");
			return true;
		}catch(Exception e){
			dataBaseObject.closeDataBase(dataBaseInstance);
			System.out.println("Cannot insert comments -> "+e);
		}
		return false;		
	}


	public void doGet(HttpServletRequest request,HttpServletResponse response)
	{
		try{
			System.out.println("Called CommentHandler");
			JSONObject postData= getJson(request);
			String postId = postData.get("postid").toString();
			String email = postData.get("email").toString();
			String theComment = postData.get("comments").toString();
			String data[] = {postId, email, theComment};

			if(theComment == null && postId == null && email == null){

				sendResponse(response, "cannotcomment");
			}
			
			else{

				if(pushData("CommentsTable", data)){
						System.out.println("Comment inserted");
						sendResponse(response, "commented");
				}else{
					System.out.println("Comment NOT inserted");
					sendResponse(response, "not");
				}
			}	
		}
		catch(Exception e){
			System.out.println("Comment not inserted");
			sendResponse(response, "cannotcomment");
			System.out.println("Exception from Comments handler -> "+e);
		}	
	}			
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		doGet(request,response);
	}	
}


