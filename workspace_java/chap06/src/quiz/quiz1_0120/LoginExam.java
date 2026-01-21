package quiz.quiz1_0120;

public class LoginExam {

	public static void main(String[] args) {

		/** 문제 12 (회원가입, 로그인)
		 * 회원가입 받기
		 * 로그인 하기
		 * - 로그인 성공 시, "메인페이지" 출력
		 * - 로그인 실패 시, "다시 로그인 하세요" 출력
		 * 
		 * main에서 [회원](클래스)을 생성.
		 * - 단, 아이디, 비번 없이 생성 불가능
		 * 생성한 [회원] 목록이 필요
		 * "로그인"(메소드) 전달인자 아이디, 비번
		 * - 리턴은 로그인 성공여부
		 */
		
		Members[] membersList = {
				new Members("a", "id1", "pw1"),
				new Members("b", "id2", "pw2"),
				new Members("c", "id3", "pw3"),
				new Members("d", "id4", "pw4")
		};
		
		membersList[0].Login("id2", "pw2");
		membersList[0].Login("id1", "pw1");
		
		
		System.out.println("=== 회원목록 ===");
		for (int i=0; i<membersList.length; i++) {
			membersList[i].viewList(membersList[i]);
		}
		
		
		
	} // method

} // field
