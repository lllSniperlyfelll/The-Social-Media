package user_services;

import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import database_connector.databaseConnector;


public class registerUser extends HttpServlet
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
			responseObj.put("registerStatus",toWrite);
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
			System.out.println("Called registerUser");
			JSONObject userData = getJson(request);
			String userFullName, userPassword, userEmail, userGender;
			userFullName = userData.get("name").toString();
			userPassword = userData.get("password").toString();
			userEmail = userData.get("email").toString();
			userGender = userData.get("gender").toString();
			if(userFullName != null && userPassword != null && userEmail != null && userGender != null){
				databaseConnector dataBaseObject = new databaseConnector();
				Connection dataBaseInstance = dataBaseObject.getDataDatabase();
				PreparedStatement pstmt = dataBaseInstance.prepareStatement("INSERT INTO RegisteredUsers values(?,?,?,?,?,?)");  
				pstmt.setString(1,userEmail);
				pstmt.setString(2,userPassword);
				pstmt.setString(3,userFullName);
				pstmt.setString(4,userGender);
				pstmt.setString(5,"Add your status");
				pstmt.setString(6,"Add your blog");
				pstmt.executeUpdate();
				pstmt.close();
				dataBaseObject.closeDataBase(dataBaseInstance);
				System.out.println("Data inserted");
				sendResponse(response, "true");
			}
			else{
				System.out.println("Data NOT inserted");
				sendResponse(response, "false");
			}
		}
		catch(Exception e){
			System.out.println("Data NOT inserted");
			sendResponse(response, "false");
			System.out.println("Exception from userRegister -> "+e);
		}
			
			
	}			
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		doGet(request,response);
	}			
}
	