package quiz.quiz1_0120;

public class FanExam {

	public static void main(String[] args) {
		
		/** 문제7 (선풍기 fan)
		 * 
		 * - method
		 * 전원 켜기
		 * 전원 끄기
		 * 약풍
		 * 강풍
		 * (단, 전원이 켜진 상태에서만 바람이 나옴)
		 */
		
		Fan fan = new Fan();
		
		fan.weak();
		System.out.println();
		
		fan.powerOn();
		fan.strong();
		fan.check(fan);
		System.out.println();
		
		fan.weak();
		fan.check(fan);
		System.out.println();
		
		fan.powerOff();
		fan.check(fan);
		System.out.println();
		
	} // method

} // field
