package quiz.quiz1_0120;

public class MarketExam {

	public static void main(String[] args) {
		
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
		
		System.out.println("=== <상품정보> ===");
		System.out.println();
		
		MarketGoods g1 = new MarketGoods(1, "키보드", 30000, "상세정보");
		g1.viewInfo();
		System.out.println();
		
		MarketGoods g2 = new MarketGoods(2, "텀블러", 50000, "상세정보");
		g2.viewInfo();
		System.out.println();
		
		MarketGoods g3 = new MarketGoods(3, "핸드폰", 1500000, "상세정보");
		g3.viewInfo();
		System.out.println();
		System.out.println();
		
		
		System.out.println("=== <회원정보> ===");
		System.out.println();
		
		MarketMembers m1 = new MarketMembers("회원1");
		m1.cart.add(g1.goods.get(1));
		m1.cart.add(g2.goods.get(1));
		m1.cart.add(g3.goods.get(1));
		m1.viewInfo();
		
		MarketMembers m2 = new MarketMembers("회원2");
		m2.cart.add(g3.goods.get(1));
		m2.cart.add(g2.goods.get(1));
		m2.viewInfo();
		
		
	} // method end

}
