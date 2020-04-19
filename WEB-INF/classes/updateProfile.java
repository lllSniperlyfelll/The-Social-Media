package user_services;

import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import database_connector.databaseConnector;


public class updateProfile extends HttpServlet
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
			responseObj.put("updatestatus",toWrite);
			System.out.println(responseObj);
			pw.println(responseObj);
			pw.flush();
		}
		catch(Exception e){
			System.out.println(e);
		}
		
	}
	public void doGet(HttpServletRequest request,HttpServletResponse response)
	{
		try{
			System.out.println("Called updateProfile");
		
			JSONObject userDataUpdate = getJson(request);
			System.out.println("Got at server -> "+userDataUpdate);
			if(userDataUpdate.get("email") != null){
				String blog = userDataUpdate.get("blog").toString();
				String userStatus = userDataUpdate.get("status").toString();
				System.out.println("New blog -> "+blog);
				System.out.println("New status -> "+userStatus);
				String query;
				if(blog.equals("Add your blog") == true && userStatus.equals("Add your status") == false){
					databaseConnector dataBaseObject = new databaseConnector();
					Connection dataBaseInstance = dataBaseObject.getDataDatabase();
					PreparedStatement pstmt = dataBaseInstance.prepareStatement("UPDATE RegisteredUsers SET UserStatus=? WHERE Email=?");  
					pstmt.setString(1,userStatus);
					pstmt.setString(2,userDataUpdate.get("email").toString());
					pstmt.executeUpdate();
					pstmt.close();
					dataBaseObject.closeDataBase(dataBaseInstance);
				}
				else if(blog.equals("Add your blog") == false && userStatus.equals("Add your status") == true){
					databaseConnector dataBaseObject = new databaseConnector();
					Connection dataBaseInstance = dataBaseObject.getDataDatabase();
					PreparedStatement pstmt = dataBaseInstance.prepareStatement("UPDATE RegisteredUsers SET Blog=? WHERE Email=?");  
					pstmt.setString(1,blog);
					pstmt.setString(2,userDataUpdate.get("email").toString());
					pstmt.executeUpdate();
					pstmt.close();
					dataBaseObject.closeDataBase(dataBaseInstance);	
				}
				
				System.out.println("Data Updated");
				sendResponse(response, "yes");
			}
			else{
				System.out.println("Data NOT Updated");
				sendResponse(response, "no");
			}
		}
		catch(Exception e){
			System.out.println("Data NOT Updated");
			sendResponse(response, "no");
			System.out.println("Exception from updateProfile -> "+e);
		}
		
	}			
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		doGet(request,response);
	}			
}
	