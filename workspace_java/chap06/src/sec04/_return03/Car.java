package sec04._return03;

public class Car {
	
	int gas;
	
	void setGas(int g) {
		gas = g;
	}
	
	
	
	boolean isLeftGas() {
		if (gas == 0) {
			System.out.println("연료가 없습니다");
			return false;
		} else {
			System.out.println("연료가 있습니다");
			return true;
		} // if gas end
	} // boolean isLeftGas end
	
	// 두 개는 같은 거
	
	boolean isLeftGas2() {
		
		// return 하는 순간에 method 종료
		if (gas == 0) {
			System.out.println("연료가 없습니다");
			return false; // return 만나면 종료
//			System.out.println(); // return 다음 도달할 수 없는 코드 : error 발생
		} // if end
		
		System.out.println("연료가 있습니다");
		return true;
		
	} // boolean isLeftGas2 end
	
	
	// return을 한 번만 하는 방식
	boolean isLeftGas3() {
		
		boolean result = false;
		
		if (gas == 0) {
			System.out.println("연료가 없습니다");
			result = false;
		} else {
			System.out.println("연료가 있습니다");
			result = true;
		} // if gas end
		
		return result;
		
	} // boolean isLeftGas3 end
	
	
	// boolean 기본값은 false == (gas != 0)
	boolean isLeftGas4() {
		
		return (gas != 0);
		
	} // boolean isLeftGas4 end
	
	
	
	
	void run() {

		while (true) {
			if (isLeftGas4()) { // isLeftGas4() == (gas>0)
				System.out.println("run. 잔량: " + gas);
				gas--;
			} else {
				System.out.println("stop. 잔량: " + gas);
				System.out.println("운행을 종료합니다");
				return; // break와 비슷한 기능
			} // if end
			
			// void의 경우, return을 생략할 수 있음
			// 그러나, 위 코드와 같이 사용할 수도 있음
			
		} // while end
	
	} // void end
	
	
	
	
} // field end
