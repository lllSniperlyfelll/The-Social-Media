package user_services;


import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import database_connector.databaseConnector;


public class ProfileData extends HttpServlet
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


	private JSONObject getUserInfo(String requestedEmail){
		try{
			databaseConnector dataBaseObject = new databaseConnector();
			Connection dataBaseInstance = dataBaseObject.getDataDatabase();
			JSONObject userJsonData = new JSONObject();
			Statement stmt = dataBaseInstance.createStatement();
			String query="SELECT Email, Name, Gender, Blog, UserStatus from registeredusers where Email="+ ("'"+requestedEmail+"'");
	        ResultSet userResultSet=stmt.executeQuery(query);
	        while(userResultSet.next()){
		       	userJsonData.put("email", userResultSet.getString("Email"));
		       	userJsonData.put("name", userResultSet.getString("Name"));
		       	userJsonData.put("gender", userResultSet.getString("Gender"));
		       	userJsonData.put("blog", userResultSet.getString("Blog"));
		       	userJsonData.put("status", userResultSet.getString("UserStatus"));
		    }
		    System.out.println(userJsonData);
		    dataBaseObject.closeDataBase(dataBaseInstance);
		    System.out.println("From ProfileData -> "+userJsonData);
		    return userJsonData;
		}
		catch(Exception e){
			System.out.println("Exception at server while fetching data -> "+e);
		}
		return new JSONObject();
	}


	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
		String requestedEmail = getJson(request).get("email").toString();
		System.out.println("Request at ProfileData -> "+requestedEmail);
		JSONObject theUserData = getUserInfo(requestedEmail);
		pw.println(theUserData);

	}

	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		doGet(request,response);
	}
}