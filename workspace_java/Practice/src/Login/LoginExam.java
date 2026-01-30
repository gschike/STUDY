package Login;

public class LoginExam {

	public static void main(String[] args) {

		Member m1 = new Member("qwerty", "asdfg");
		Member m2 = new Member("asdfg", "qwerty");
		
		Naver naver = new Naver();
		naver.join(m1);
		naver.join(m2);
		
		naver.login("qwerty", "asdfga");
		naver.login("qwerty", "asdfg");
		
		
	} // method

} // field
