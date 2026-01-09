package chap04;

public class SwitchExam_02 {

	public static void main(String[] args) {
		/// switch는 크다, 작다는 안 되고 "같다"만 가능함
		// break 매우 중요!!!
		
		
		int num = 1;
		if (num == 1) {
			System.out.println("1입니다");
		} else if (num == 2) {
			System.out.println("2입니다");
		} else {
			System.out.println("1 또는 2가 아닙니다");
		}
		
		// 그대로 siwtch로 변환
		
		/* switch 문에서 사용 가능한 것
		 * : byte, char, short, int, String
		 * : 실무에서 int, String 밖에 안 쓰긴 함
		 * 
		 * 사용 불가능한 것
		 * : long, float, double, boolean
		 */
		
		switch(num) {
			case 1:
				System.out.println("1입니다");
				break; // break 매우 중요!!! break 없으면 조건 상관 없이 아래까지 실행됨
				
			case 2:
				System.out.println("2입니다");
				break;
				
			default:
				System.out.println("1 또는 2가 아닙니다");
		}
		
		
		/// 계절 출력 ///
		
		int month = 1;
		
		switch(month) {
		// break가 없으면 or 처럼 작동함

			case 3:
			case 4:
			case 5:
				System.out.println("봄");
				break;
				
			case 6:
			case 7:
			case 8:
				System.out.println("여름");
				break;
				
			case 9:
			case 10:
			case 11:
				System.out.println("가을");
				break;
				
			case 12:
			case 1:
			case 2:
				System.out.println("겨울");
				break;
				
			default:
				System.out.println("잘못입력했습니다.");
		} // switch 끝
		
		
		
		

	} // end

}
