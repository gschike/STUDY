package Cafe;

public class CafeExam {

	public static void main(String[] args) {
		
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
		
		
		Coffee[] menus = {
				new Coffee ("아메리카노", 1500),
				new Coffee ("라떼", 2500)
		};
		
		menus[0].addOptions (menus[0], "아이스", 500);
		menus[0].addOptions (menus[0], "연하게", 0);
		menus[1].addOptions (menus[1], "아이스", 500);
		menus[1].addOptions (menus[1], "아몬드 우유 변경", 700);
		menus[1].addOptions (menus[1], "얼음 적게", 0);
		
		Kiosk k = new Kiosk ();
		System.out.println();
		
		k.menu(menus);
		k.select (menus[0]);
		k.optionSelect (menus[0], "아이스");
		k.optionSelect (menus[0], "연하게");
		
		k.select (menus[1]);
		k.optionSelect(menus[1], "아몬드 우유 변경");
		k.optionSelect(menus[1], "얼음 적게");
		
		k.cart ();
		
		k.home();
		k.finish();
		
		k.receipt();
		
	}

}
