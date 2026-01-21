package sec05._this;

public class Car {

	String model;
	
	Car () { }
	
	void setModel (String model) { // 필드명과 같은 변수명을 사용하는 경우가 많음
//		model = model; // shadow 현상
		
		this.model = model; // 필드명과 동일, 필드의 것을 받기 위해 this.을 붙임
		// this는 instance를 가리키는 것
		// this는 "new가 된 나"를 의미
	}
	
	Car (String model) {
		this.model = model;
	}
	
	
	
	
	
}
