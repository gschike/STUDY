package sec06._package.pack3;

//import sec06._package.pack1.Access3;
//import sec06._package.pack1.Access1;
import sec06._package.pack1.Edu;
import sec06._package.pack2.Access2;

public class AccessExam {

	public static void main(String[] args) {
		
//		Access1 a1 = new Access1(); // 안 됨 : The constructor Access1() is not visible && public으로 바꾸실래요?
		// public이 아니어서 생성 못함
		// default 접근제한자 : 같은 패키지 내에서 사용 가능
		
		
		Access2 a2 = new Access2(); // 됨!
		// public
		
		Edu e = new Edu(); // 됨!
		// edu 에는 생성자 없음 > 즉, 기본 생성자!
		// 기본 생성자는 public
		
//		a2.d1 = 20; // 안 됨: The field Access2.d1 is not visible
		a2.p1 = 20; // 됨
		
//		a2.d(); // 안 됨: The method d() from the type Access2 is not visible
		a2.p(); // 됨
		
		// public 없는 class (default)
		// class Access3
//		Access3 a3 = new Access3(); // import 조차 안 됨: Access3 cannot be resolved to a type
		
//		a2.hp = 10; // 안 됨! : The field Access2.hp is not visible
		
	}
}
