package quiz.quiz2_0121;

public class Fan {
	
	/** 문제7 (선풍기 fan)
	 * 
	 * - method
	 * 전원 켜기
	 * 전원 끄기
	 * 약풍
	 * 강풍
	 * (단, 전원이 켜진 상태에서만 바람이 나옴)
	 */
	
	boolean power;
	boolean strong;
	
	void powerOn () {
		this.power = true;
		System.out.println("전원을 켰습니다");
	}
	
	void powerOff () {
		this.power = false;
		System.out.println("전원을 껐습니다");
	}
	
	void weak () {
		if (this.power == false) {
			System.out.println("전원이 켜져있지 않습니다");
		} else {
			this.strong = false;
			System.out.println("약풍");
		}
	}
	
	void strong () {
		if (this.power == false) {
			System.out.println("전원이 켜져있지 않습니다");
		} else {
			this.strong = true;
			System.out.println("강풍");
		}
	}
	
	void check (Fan f) {
		
		if (this.power == false) {
			System.out.println("전원: off");
		} else {
			System.out.println("전원: on");
			
			if (this.strong == false) {
				System.out.println("세기: 약풍");
			} else {
				System.out.println("세기: 강풍");
			} // strong if
			
		} // power if
	}
	
}
