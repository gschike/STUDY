package quiz.quiz1_0120;

public class Item {

	/** 문제 13 (MES)
	 * 
	 * [Item] 제품
	 * - 필드: 이름
	 * - 생성자: 이름 필수
	 * - 메소드: 이름을 리턴
	 * 
	 * [Process] 공정 (일 하는 방법, 순서)
	 * - 메소드: run (실행)
	 * 	- 전달인자: item
	 *  - 리턴타입: 없음
	 * 하는 일: Item이름 + "생산 완료" 출력
	 * 
	 * [Execution] 실행 = main
	 * - 메소드: main
	 * - 제품 1과 제품 2 생성
	 * - 공정 run에 넣고 실행하기
	 */
	
	String name;
	Item (String name) {
		this.name = name;
	}
	
	String getItem () {
		return this.name;
	}
	
}
