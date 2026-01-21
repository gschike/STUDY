package Market;

public class Goods {
	
//	상품
//	- 상품명, 가격, 상세정보
	
	String name;
	int price;
	String info;
	
	Goods (String name, int price, String info) {
		this.name = name;
		this.price = price;
		this.info = info;
	}
	
	void viewInfo () {
		System.out.println("상품명: " + this.name);
		System.out.println("가격: " + this.price);
		System.out.println("상세정보: " + this.info);
	}
	

}
