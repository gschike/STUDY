package sec04._return03;

public class Student {
	
	String name;
	int age;
	
	/** setter : setting 따로 method로 만들기
	 * - field 값을 수정하는 용도의 method
	 * - 메소드명 : set + 필드명 (첫 글자는 대문자)
	 * - 전달인자 : 필드의 타입 (하나만)
	 * - 리턴타입 : void
	 * 
	 * 메소드명: setName
	 * 전달인자: String
	 * 리턴타입: void (리턴이 없다는 의미)
	 */
	void setName (String n) {
		
		if (name!=null) {
			name = n;
		} else {
			name = "n/a";
		}
	}
	
	/** getter
	 * - 메소드명 : get + 필드명 (첫 글자는 대문자)
	 * - 전달인자 : 없음
	 * - 리턴타입 : 필드의 타입
	 * 
	 * 메소드명: getName
	 * 전달인자:
	 * 리턴타입: String (리턴이 없다는 의미)
	 */
	
	String getName() {
		return name;
	}
	

}
