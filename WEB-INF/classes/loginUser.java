package user_services;

import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import database_connector.databaseConnector;


public class loginUser extends HttpServlet
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
			responseObj.put("loginaccess",toWrite);
			System.out.println(responseObj);
			pw.println(responseObj);
			pw.flush();
		}
		catch(Exception e){
			System.out.println(e);
		}	
	}

	private boolean checkCredits(String email, String authkey){
		try{
			databaseConnector dataBaseObject = new databaseConnector();
			Connection dataBaseInstance = dataBaseObject.getDataDatabase();
			Statement stmt = dataBaseInstance.createStatement();
			String query="SELECT Password from registeredusers where Email="+ ("'"+email+"'");
		    ResultSet userResultSet=stmt.executeQuery(query);
		    while(userResultSet.next()){
		    	String tempCredits =  userResultSet.getString("Password");
		    	System.out.println("Password from database -> "+tempCredits);
		    	if(tempCredits == null || tempCredits.equals("")){
		    		return false;
		    	}
		    	else if(tempCredits.equals(authkey) == false){
		    		return false;
		    	}
		    	else{
		    		return true;
		    	}
			}
			dataBaseObject.closeDataBase(dataBaseInstance);
		}
		catch(Exception e){
			System.out.println("Exception at loginUser -> "+e);
		}
		return false;
	}

	public void doGet(HttpServletRequest request,HttpServletResponse response)
	{
		try{
			System.out.println("Called loginUser");
		
			JSONObject userLoginData= getJson(request);
			System.out.println("Got at server login-> "+userLoginData);
			if(userLoginData.get("email") != null && userLoginData.get("authkey") != null){
				String email = userLoginData.get("email").toString();
				String userPassword = userLoginData.get("authkey").toString();
				System.out.println("emial -> "+email);
				System.out.println("userPassword -> "+userPassword);
				
				if(checkCredits(email, userPassword) == true){
					System.out.println("login allowded!!!");
					sendResponse(response, "allow");
				}
				else{
					System.out.println("login not allowded!!!");
					sendResponse(response,"not");
				}
			}
			else{
				System.out.println("login not allowded!!!");
				sendResponse(response, "not");
			}
		}
		catch(Exception e){
			System.out.println("login not allowded!!!");
			sendResponse(response, "not");
			System.out.println("Exception from updateProfile -> "+e);
		}
		
	}			
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		doGet(request,response);
	}			
}
	