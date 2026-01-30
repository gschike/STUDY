package quiz.quiz2_0121;

public class Login {
	
	String id;
	String pw;
	
	
	Login (Members member) {
		this.id = member.id;
		this.pw = member.pw;
	}
	
	void loginTry (String id, String pw) {
		if (this.id != id || this.pw != pw) {
			System.out.println("로그인에 실패하셨습니다. 아이디와 비밀번호를 다시 입력해주세요.");
		} else {
			System.out.println("로그인에 성공하였습니다. 메인페이지로 이동합니다.");
		}
		System.out.println();
	}
	
}
