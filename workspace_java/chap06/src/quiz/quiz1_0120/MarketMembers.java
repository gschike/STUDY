package quiz.quiz1_0120;

import java.util.ArrayList;

public class MarketMembers {
	
	
	// id, 장바구니[5]
	
	String id;
	ArrayList cart = new ArrayList();
	
	ArrayList members = new ArrayList();

	MarketMembers (String id) {
		this.id = id;
		
		members.add(this.id);
		members.add(this.cart);
	}
	
	void viewInfo () {
		System.out.println("회원ID: " + this.id);
		System.out.println("장바구니: " + this.cart);
		System.out.println();
	}
	

}
