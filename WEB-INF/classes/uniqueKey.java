package security_service;

import java.io.*;
import java.math.*;
import java.nio.charset.*;
import java.security.*;
import java.util.*;
import java.math.*;

public class uniqueKey{

	private byte[] getHash(String mssgBytes) {
		try{
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		return md.digest(mssgBytes.getBytes(StandardCharsets.UTF_8));
		}catch(Exception e){
			System.out.println("Exception in generating key -> "+e);
		}
		return new byte[1];
	}
	private String paddMssg(String mssgg){
		byte mssg[] = getHash(mssgg); 
		BigInteger num = new BigInteger(1, mssg);
		StringBuilder hexString = new StringBuilder(num.toString(16));
		while(hexString.length() < 32){
			hexString.insert(0, "0");
		}
		return hexString.toString();
	}
	public String getKey(String data){
		return paddMssg(data + System.currentTimeMillis() * new Random().nextInt());
	}
}
