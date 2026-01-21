package quiz.quiz1_0120;

import java.util.ArrayList;

public class MarketGoods {
	
	/** 심화 (지마켓 만들기)
	 * 
	 * 클래스: 상품, 사용자, 쇼핑몰 (main)
	 * 
	 * 상품
	 * - 상품명, 가격, 상세정보
	 * 
	 * 사용자
	 * - ID, 장바구니[5]
	 * 
	 * 쇼핑몰
	 * 1. 상품 3개 이상 진열
	 * 2. 회원 2명 이상
	 * 3. 회원의 장바구니에 물건 2개 이상씩 담기
	 * 4. 회원 별로 장바구니 내역 출력
	 */
	
	
	int goodsNo;
	String name;
	int price;
	String info;
	
	ArrayList goods = new ArrayList();

	MarketGoods (int goodsNo, String name, int price, String info) {
		this.goodsNo = goodsNo;
		this.name = name;
		this.price = price;
		this.info = info;
		
		goods.add(goodsNo);
		goods.add(name);
		goods.add(price);
		goods.add(info);
	}
	
	void viewInfo () {
		System.out.println("상품번호: " + goods.get(0));
		System.out.println("상품이름: " + goods.get(1));
		System.out.println("가격: " + goods.get(2));
		System.out.println("상세정보: " + goods.get(3));
	}

}
