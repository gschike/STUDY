package sec03;

import java.util.Scanner;

public class CarExam {

	public static void main(String[] args) {
		
//		new Car("KIA"); // new 될 때 Car 실행
		
		Car c3 = null;
		try {
			// 생성자가 실행 되어야 실제 생성이 된다
			
			c3 = new Car(); // 에러 발생 > 무조건 위에 값 유지 > null
			
		} catch (Exception e) {
			System.out.println("new Car() 에서 예외 발생");
		}
		
		System.out.println("c3: " + c3); // null
		
	}

}
