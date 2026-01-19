package sec01.exam01;

public class StudentExam {
	
	// 필드
	
	public static void main(String[] args) { // main이 실제로 실행되는 영역. Student는 main이 없어서 실행 안 됨
		
		// 메소드
		
		Student s1 = new Student(); // Student 타입의 s1(변수명)에 담아놓음
		
		Student s2; // 참조 타입이므로 null 가능
		s2 = new Student();
		
		
		System.out.println("s1 == s2: " + (s1 == s2)); // false : new 로 선언했으므로 주소가 다름!
		
		Student s3 = null;
		s3 = s1; // 같은 타입이기 때문에 가능!
		System.out.println("s1 == s3: " + (s1 == s3)); // true : 주소 공유했기 때문!
		
		s1 = null; // stack 영역의 주소를 끊어내는 것 | s3 != null
		System.out.println("s3 == null: " + (s3 == null)); // false : s3의 주소는 끊어지지 않기 때문
		s1 = s2; // s3는 그대로 s1에 들어갔던 heap 영역(instance)을 가리킴 | s3 != s2
		System.out.println("s1 == s3: " + (s1 == s3)); // false
		System.out.println("s2 == s3: " + (s2 == s3)); // false
		
		
		
	} // end

} // end
