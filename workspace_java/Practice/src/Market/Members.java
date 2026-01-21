package Market;

import java.util.ArrayList;

public class Members {
	
	String id;
	ArrayList cart = new ArrayList();
	
	Members (String id) {
		this.id = id;
	}
	
	void viewInfo () {
		System.out.println("ID: " + this.id);
		System.out.print("장바구니: ");
		for (int i=0; i<this.cart.size(); i++) {
			System.out.print(cart.get(i) + " ");
		}
		
	}
	
	
}
