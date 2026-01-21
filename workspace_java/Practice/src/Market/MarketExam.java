package Market;

import java.util.ArrayList;

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
		
		
		ArrayList goodsList = new ArrayList();
		goodsList.add(new Goods("키보드", 50000, "타건감 굿"));
		goodsList.add(new Goods("갤럭시 s26", 1500000, "개비쌈"));
		goodsList.add(new Goods("스탠리 텀블러", 50000, "튼튼"));
		
		System.out.println("==== 상품정보 ====");
		
		for (int i=0; i<goodsList.size(); i++) {
			
			if (goodsList.get(i) == null) { // 방어코딩!
				continue;
			}
			
			((Goods) goodsList.get(i)).viewInfo(); // 형변환!! 혹은 generic <Goods> 사용하기
			System.out.println();
		}

		
		
		ArrayList membersList = new ArrayList();
		membersList.add(new Members("abc"));
		membersList.add(new Members("def"));
		membersList.add(new Members("ghi"));
		
		((Members)membersList.get(0)).cart.add(goodsList.get(0));
		((Members)membersList.get(0)).cart.add(goodsList.get(1));
		((Members)membersList.get(0)).cart.add(goodsList.get(2));
		
		((Members)membersList.get(1)).cart.add(goodsList.get(2));
		((Members)membersList.get(1)).cart.add(goodsList.get(0));
		
		((Members)membersList.get(2)).cart.add(goodsList.get(1));
		((Members)membersList.get(2)).cart.add(goodsList.get(0));
		
		System.out.println("==== 회원정보 ====");
		
		for (int i=0; i<membersList.size(); i++) {
			
			if (membersList.get(i) == null) { // 방어코딩!
				continue;
			}
			
			((Members) membersList.get(i)).viewInfo();
			
			System.out.println();
		}
		
		
	} // method end

} // field end
