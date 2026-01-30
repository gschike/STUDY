package sec06._package.pack1;

public class Access1 {
	
	Access1() {
		System.out.println("Access1 생성자 실행");
	}	
	
	
	
}

// 다른 패키지에서 안 보이는 클래스
class Access3 { // class는 파일명과 같은 것만 public 가능
	
	// 생성자는 기본생성자, 즉, public
	// 그러나 클래스 자체가 public이 아니기 때문에, 다른 패키지에서 사용 불가능
	
}