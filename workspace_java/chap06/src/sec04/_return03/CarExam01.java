package sec04._return03;

public class CarExam01 {

	public static void main(String[] args) {
		
		Car car = new Car();
		
		boolean status = car.isLeftGas4(); // 리턴타입: boolean
		System.out.println("가스 유무: " + status); // false : new 될 때 필드 초기화, 초기화값 false
		
		car.setGas(3);
//		car.gas = 3; // 위랑 같은 거
		System.out.println("가스 유무: " + car.isLeftGas4()); // true
		
		car.run();
		
		
		System.out.println("--- car2 ---");
		
		Car car2 = new Car();
		
		car2.setGas(5);
		car2.run();
		

	} // method end

} // field end
