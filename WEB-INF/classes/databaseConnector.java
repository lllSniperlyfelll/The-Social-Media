
package database_connector;

import java.io.*;
import java.sql.*;
import java.util.*;


public class databaseConnector
{

	public Connection getDataDatabase()
	{	
		Connection com = null;
		try{
		Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
		com = DriverManager.getConnection("jdbc:mysql://localhost:3306/SocialMediaDb","root","");
		return(com);
		}
		catch(Exception e){
			System.out.println("Error opening database"+e);
		}
		return(com);
	}

	public Connection getCommentsdb(){
		Connection com = null;
		try{
			Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			com = DriverManager.getConnection("jdbc:mysql://localhost:3306/SocialMediaCommentsDb","root","");
			return(com);
		}
		catch(Exception e){
			System.out.println("Error opening database"+e);
		}
		return(com);
	}

	public void closeDataBase(Connection com){
		try{
		com.close();
		}
		catch(Exception e){
			System.out.println("Error closing database"+e);
		}
	}


}