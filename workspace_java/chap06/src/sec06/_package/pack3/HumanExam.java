package sec06._package.pack3;

//import sec06._package.pack1.Edu;
//import sec06._package.pack1.Human; // !! import 한 파일 위치 알려줌 !!

//import sec06._package.pack2.Human; // 이렇게 겹치면 어떤 클래스 가져온 건지 헷갈리기 때문에 불가능

import sec06._package.pack1.*; // pack1에 있는 (내 폴더만) 모든 클래스!


public class HumanExam {

	public static void main(String[] args) {
		
		// 다른 폴더에 있는 거 가지고 와서 사용하기
//		sec06._package.pack1.Human h1 = new sec06._package.pack1.Human(); // 정석적인 방법
		// 같은 폴더에 있는 경우 생략 가능!
		
		// 이게 귀찮아서 import 하는 것
		Human h1 = new Human();
		
		// 겹쳐서 임포트 못하면 이렇게 써야함
		sec06._package.pack2.Human h2 = new sec06._package.pack2.Human();
		
		Edu e1 = new Edu();
		
		// 하위 패키지의 클래스는 가져오지 않음
//		import sec06._package.pack1.sub1.*; // *로 모두 불러왔지만, 하위 폴더까지 가져오는 건 아님
//		new Sub1();
		
		// 얘는 왜 임포트 하지 않았을까?
		// String의 패키지: java.lang
		// System의 패키지: java.lang
		// Math.random의 패키지: java.lang
		
		// java.lang.* : 자동으로 선언. 임포트 생략 가능!
		String a = "a";
		System.out.println(a + Math.random());
		
		/** 단, 프로젝트는 넘어갈 수 없음!
		 * chap 05 가서 가져오는 건 불가능
		 * 패키지만 넘어갈 수 있음
		 */
		
	} // end
	
} // end
