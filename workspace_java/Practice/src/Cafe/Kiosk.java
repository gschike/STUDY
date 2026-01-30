package Cafe;

import java.util.ArrayList;
import java.util.Scanner;

public class Kiosk {
	
	/** 커피 생산 관리
	 * 생산하려는 커피의 종류 선택
	 * 커피의 종류에 따라 상세 종률 선택
	 * 필요한 경우 더 상세한 내용을 선택 (필요 없을 경우 생략 가능)
	 * 각각 선택할 메뉴 표시에 가격이 정해져 있다면 가격도 같이 표시
	 * 선택한 내용을 확인할 수 있게 출력
	 * 언제나 처음 단계로 돌아갈 수 있는 기능 필요
	 * 언제나 종료할 수 있는 기능 필요
	 * 
	 * 선택한 메뉴들로 이루어진 완제품의 최종 가격 (영수증)
	 * 
	 * 커피
	 * - 메뉴이름, 가격, 옵션(리스트)
	 * 
	 * 키오스크
	 * 기능:
	 * - 메뉴 불러오기
	 * - 메뉴 담기
	 * - 선택한 내용 확인
	 * - 처음으로 돌아가기
	 * - 종료
	 * 
	 * 영수증
	 */
	
	Kiosk () {
		System.out.println("==== 시작 화면 ====");
	}
	
	void menu (Coffee[] menus) {
		System.out.println("=========== 메뉴 ===========");
		for (int i=0; i<menus.length; i++) {
			System.out.println(menus[i].name + " : " + menus[i].price + "원");
			
			System.out.println("   옵션:");
			for (int j=1; j<menus[i].options.size(); j++) {
				System.out.print("\t" + menus[i].options.get(j));
				System.out.println("   " + menus[i].optionsPrice.get(j) + "원");
			}
			System.out.println();
			
		}
		System.out.println("============================");
	}
	
	ArrayList<Coffee> selects = new ArrayList<Coffee>();
	ArrayList<String> cart = new ArrayList<String>();
	ArrayList<Integer> prices = new ArrayList<Integer>();

	
	
	// 카트에 담기
	void select (Coffee menu) {
		
		System.out.println();
		selects.add(menu);
		cart.add(menu.name);
		prices.add(menu.price);
		
//		for (int i=0; i<menu.options.size(); i++) {
//			if (option.equals(menu.options.get(i))) {
//				total += menu.optionsPrice.get(i);
//			}
//		}
		
		System.out.println(menu.name + " 담기");
		System.out.print("선택 가능 옵션: ");
		for (int i=1; i<menu.options.size(); i++) {
			System.out.print(menu.options.get(i) + " | ");
		}
		System.out.println();
		
	}
	

	void optionSelect (Coffee menu, String option) {
		for (int i=0; i<menu.options.size(); i++) {
			if (option.equals(menu.options.get(i))) {
				menu.optionSelect.add(option);
				total += menu.optionsPrice.get(i);
				menu.optionSelectPrice.add(menu.optionsPrice.get(i));
//				menu.option = true;
				
				System.out.println(menu.options.get(i) + " : " + menu.optionsPrice.get(i));
			}
		}
	}
	

	
	int total;
	void cart () {
		System.out.println();
		System.out.print("장바구니 : ");
		
		for (int i=0; i<cart.size(); i++) {
			System.out.print(cart.get(i) + " | ");
		}
		System.out.println();
		
		for (int i=0; i<prices.size(); i++) {
			total += prices.get(i);
		}
		System.out.print("총 금액 : " + total + "원");
		System.out.println();
	}
	
	void receipt () {
		System.out.println();
		System.out.println("======== 영수증 =========");
		System.out.println();
		for (int i=0; i<selects.size(); i++) {
			System.out.print(selects.get(i).name);
			System.out.println("\t" + selects.get(i).price);
			
			for (int j=0; j<selects.get(i).optionSelect.size(); j++) {
				System.out.print(" " + selects.get(i).optionSelect.get(j));
				System.out.println("      " + selects.get(i).optionSelectPrice.get(j));
			}
			System.out.println("--------------------------");
		}
		System.out.println("총 금액: " + total + "원");
	}
	
	void home () {
		System.out.println();
		new Kiosk();
	}
	
	void finish () {
		System.out.println();
		System.out.println();
		System.out.println("키오스크를 종료합니다");
	}
	

}
