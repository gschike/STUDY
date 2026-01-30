package Cafe;

import java.util.ArrayList;

public class Coffee {
	
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
	
	String name;
	int price;
	
	ArrayList<String> options = new ArrayList<String>();
	ArrayList<Integer> optionsPrice = new ArrayList<Integer>();
	
	Coffee (String name, int price) {
		this.name = name;
		this.price = price;
		
		this.options.add("없음");
		this.optionsPrice.add(0);
	}
	
	void addOptions (Coffee name, String option, int oPrice) {
		this.options.add(option);
		this.optionsPrice.add(oPrice);
	}

	//	boolean option = false;

	ArrayList<String> optionSelect = new ArrayList<String>();
	ArrayList<Integer> optionSelectPrice = new ArrayList<Integer>();
	
	
}
