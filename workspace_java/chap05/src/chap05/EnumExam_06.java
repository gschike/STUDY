package chap05;

public class EnumExam_06 {

	public static void main(String[] args) {
		
		// 우리만의 타입을 만들어낸 것! : 타입 Week, 변수명 week
		Week week; // == int a; : 아직 값이 들어간 게 없음
		Week week2;
		
		week = Week.FRIDAY; // 변수에 들어갈 수 있는 거는 쟤가 가지고 있는 것밖에 없음
		// select 박스나 radio 처럼 선택할 수 있는 변수를 한정해줌. "평일 마지막 날" 요따구로 못 쓰게
		
		System.out.println(week);
		
		System.out.print("switch: ");
		switch (week) {
		
			case MONDAY :
				System.out.println("월요일");
				break;
			case TUESDAY :
				System.out.println("화요일");
				break;
			case WEDNESDAY :
				System.out.println("수요일");
				break;
			case THURSDAY :
				System.out.println("목요일");
				break;
			case FRIDAY :
				System.out.println("금요일");
				break;
			case SATURDAY :
				System.out.println("토요일");
				break;
			case SUNDAY :
				System.out.println("일요일");
				break;
		
		}

		
		System.out.print("if: ");
		if (week==Week.MONDAY) {
			System.out.println("월요일");
		} else if (week==Week.FRIDAY) {
			System.out.println("금요일");
		} else {
			System.out.println("다른 요일");
		}
		
		
		

	} // end

} // end
