package sec06._package.pack1;

public class Edu {
	
	void test() {
		// 같은 패키지에 있어서 사용 가능
		// 임포트도 필요없음!
		Access1 a1 = new Access1(); // public class
		Access3 a3 = new Access3(); // class (default) :: 같은 패키지 사용 가능
	}
	
}
