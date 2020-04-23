/**/package global_services.floodall_posts;
/*
Json for multimedia post will have
0. post_type
1. mmposptid
2. ImagePath
3. caption
4. tags
5. user_name
6. comments
*/

/*
Json for text post will have
1. post_type
2. textpostid
3. thepost
4. user_name
5. comments
*/

/*
textpost and nultimediapost tables are union(ed) for their posted_on collumn 
and order by the same after which for each row in above result the textpost and
multimediapost are fetched followed by comments on the same, post_type in json
will help js to identify the type of post and make cards accordingly
*/


import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import database_connector.databaseConnector;


public class floodPosts extends HttpServlet
{
  JSONObject superPosts;
  private final String multimediaPostQuery = "SELECT mmpostid, ImagePath, caption, tags, user_name FROM multimediaposts WHERE posted_on =  ";
  private final String unionQuery = "SELECT posted_on FROM multimediaposts UNION SELECT posted_on FROM textposts ORDER BY posted_on";
  private final String textPostQuery = "SELECT textpostid, thepost, user_name FROM textposts WHERE posted_on = ";
  private final String commentsQuery = "SELECT name, comments FROM commentstable WHERE postid = ";
  private final String postId = "postid";
  private final String user_name = "userName";
  private final String comment = "comments";
  private final String thepostMeta = "thepost";
  private final String imgPath = "imagepath";
  private final String caption = "caption";
  private final String tagsMeta = "imgtags";
  private final String postMetadata = "posttype";


  private void initJson(){
    System.out.println("Called init json");
    this.superPosts = new JSONObject();
  }
  private String formatCol(String colName){
    return "'"+colName+"'";
  }


  private String getComments(String postid){
    String commentsData = "";
    try{
        databaseConnector dataBaseObject = new databaseConnector();
        Connection commentsDatabase = dataBaseObject.getCommentsdb();
        Statement commentsStatement = commentsDatabase.createStatement();
        ResultSet commentsResultSet  = commentsStatement.executeQuery(commentsQuery + formatCol(postid));
        while(commentsResultSet.next()){
          commentsData += commentsResultSet.getString("name") + "?&?" + commentsResultSet.getString("comments") + "__&&__";
        }
        dataBaseObject.closeDataBase(commentsDatabase);
    }catch(Exception e){
      System.out.println("Connot get comments -> "+e);
    }finally{
      return commentsData;
    }
  }



  /*Makes json for the text posts and update the superPost json*/
  private void makeJson(String textpostid, String thepost, String users_name, String allComments){ 
    try{
      JSONObject textPostData = new JSONObject();
      textPostData.put(postMetadata,"textposts");
      textPostData.put(postId, textpostid);
      textPostData.put(thepostMeta, thepost);
      textPostData.put(user_name, users_name);
      textPostData.put(comment, allComments);
      this.superPosts.put(textpostid, textPostData);
    }catch(Exception e){
      System.out.println("Exception while making json makeJson -> "+e);
    }
  }

  /*Overloaded function to make json for Multimedia posts and update superPost json*/
  private void makeJson(String mmPostid, String imagePath, String imageCaption, String imageTags, String userNameI, String theComments){ 
    try{
      JSONObject multimediaPostData = new JSONObject();
      multimediaPostData.put(postMetadata,"mmposts");
      multimediaPostData.put(postId, mmPostid);
      multimediaPostData.put(imgPath, imagePath);
      multimediaPostData.put(caption, imageCaption);
      multimediaPostData.put(tagsMeta, imageTags);
      multimediaPostData.put(user_name, userNameI);
      multimediaPostData.put(comment, theComments);
      this.superPosts.put(mmPostid, multimediaPostData);
    }catch(Exception e){
      System.out.println("Exception while making json makeJson -> "+e);
    }
  }


  /*Method to fetch Multimedia posts*/
  private void getMultiMediaPost(String posted_on){
    try{
        databaseConnector dataBaseObject = new databaseConnector();
        Connection postsDatabase = dataBaseObject.getDataDatabase();

        Statement multimediaPostsStatement = postsDatabase.createStatement();
        System.out.println("Text post query -> "+ multimediaPostQuery + formatCol(posted_on));
        ResultSet multimediaPostsResultSet = multimediaPostsStatement.executeQuery(multimediaPostQuery + formatCol(posted_on));
        if(multimediaPostsResultSet.next() == false){
          System.out.println("No Multimedia  post found on -> "+posted_on);
        }
        else{
          System.out.println("Record found----------------------------");
            do{
              System.out.println("Entered Do While Loop");
              String mmPostid = multimediaPostsResultSet.getString("mmpostid");
              String imagePath = multimediaPostsResultSet.getString("ImagePath");
              String imageCaption = multimediaPostsResultSet.getString("caption");
              String imageTags = multimediaPostsResultSet.getString("tags");
              String userNameI = multimediaPostsResultSet.getString("user_name");
              String theComments = getComments(mmPostid);
              makeJson(mmPostid, imagePath, imageCaption, imageTags, userNameI, theComments);
            }while(multimediaPostsResultSet.next() == true);
          }

          dataBaseObject.closeDataBase(postsDatabase);

    }catch(Exception e){
      System.out.println("Exception in fetching getMultiMediaPost -> "+e);
    }
  }



/*This is the method which fetches the text posts*/
  private void getTextPosts(String posted_on){
    try{
        databaseConnector dataBaseObject = new databaseConnector();
        Connection postsDatabase = dataBaseObject.getDataDatabase();

        Statement textPostsStatement = postsDatabase.createStatement();
        System.out.println("Text post query -> "+ textPostQuery + formatCol(posted_on));
        ResultSet textPostResultSet = textPostsStatement.executeQuery(textPostQuery + formatCol(posted_on));
           if(textPostResultSet.next() == false){
              System.out.println("No text post found on -> "+posted_on);
           }
           else{
              System.out.println("Record found----------------------------");
              do{
                System.out.println("Entered Do While Loop");
                String textpostid = textPostResultSet.getString("textpostid");
                /*System.out.println("textpostid -> "+textpostid);*/
                String thepost = textPostResultSet.getString("thepost");
                /*System.out.println("thepost -> "+thepost);*/
                String userNamee = textPostResultSet.getString("user_name");
                /*System.out.println("user_name -> "+userNamee);*/
                String theComments = getComments(textpostid);
                /*System.out.println("Comments on text posts -> "+theComments);*/
                makeJson(textpostid, thepost, userNamee, theComments);
              }while(textPostResultSet.next() == true);
              /*System.out.println("Out of Do while");*/
           }
           dataBaseObject.closeDataBase(postsDatabase);
           /*System.out.println("Out of else");*/

           /*System.out.println("Super post with all text posts ->   "+this.superPosts);*/
        
      }catch(Exception e){
        System.out.println("Exception in getTextPosts <- floodPosts "+e);
      }
  }



/*
This is the main method which fetched the union of the two tables and then calls
textpost fetch Method and Image Post fetch method
*/
  private void mainFetcher(){
    try{
      databaseConnector dataBaseObject = new databaseConnector();
      Connection postsDatabase = dataBaseObject.getDataDatabase();
      Statement unionQueryStatment = postsDatabase.createStatement();
      
      ResultSet PostedonResultSet = unionQueryStatment.executeQuery(unionQuery);

      while(PostedonResultSet.next()){
        String  postedOn = ((java.sql.Date) PostedonResultSet.getDate("posted_on")).toString();
        getTextPosts(postedOn);
        getMultiMediaPost(postedOn);
      }
      dataBaseObject.closeDataBase(postsDatabase);
    }catch(Exception e){
      System.out.println("Exception in mainFetcher <- floodPosts "+e);
    }
  }

	
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");
		PrintWriter pw = response.getWriter();
    System.out.println("Called floodPosts");
    initJson();
    mainFetcher();
    pw.println(this.superPosts);
		/*pw.println(getResponseJson());*/
	}

	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		doGet(request,response);
	}
}