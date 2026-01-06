package chap02;

public class VarTypeExam {

	public static void main(String[] args) {
		
		// byte는 -128 ~ 127 까지 저장 가능. 그 외에는 오류 남
		byte b1;
		b1 = 127;
		System.out.println("b1: "+b1);
//		b1 = 128; // 에러 발생
		
		
		// char는 문자. 아스키 코드를 따라 출력됨
		char c1 = 65;
		System.out.println("c1: "+c1);
		char c2 = 65 + 2;
		System.out.println("c2: "+c2);
		char c3 = 'B'; // ''는 char에서만 사용됨. char에서는 "" 사용 안 되고, ''안에는 한 글자만 가능
		System.out.println("c3: "+c3); // 내부적으로는 66을 저장, 출력은 B로
		System.out.println("c3-c1: "+(c3-c1));
		
		
		// long에는 약 21억까지 들어감
		// 뒤에 l 또는 L을 붙여서 명시적인 long 타입임을 알려야 함. 붙이지 않으면 int로 생각됨
		long l1 = 2200000000L;
		long l2 = 30;
		System.out.println("l1: "+l1);
		System.out.println("l2: "+l2);
		
		
		// String : 문자, 여러 자 가능, "" 안에
		String s1 = "홍세정";
		System.out.println("s1: "+s1);
		
		// "를 문자로 사용하고 싶으면 \" 이렇게 쓸 수 있음
		// \ 다음에 오는 한 글자는 문자로 인식됨
		String s2 = "홍\"세정\"";
		System.out.println("s2: "+s2);
		
		// \t는 탭만큼 띄움 탭 문자, \n은 엔터, \r 캐리지리턴 맨앞으로
		String s3 = "\\홍\t세\n정\r짱";
		System.out.println("s3: "+s3);
	}

}
