package Login;

import java.util.ArrayList;

public class Naver {
	
	// 필드 - 회원목록

	ArrayList<Member> members = new ArrayList<Member>();

	
	/** 기능: 회원가입 받기
	 * - 필드에 저장
	 * 
	 * 메소드명: join
	 * 전달인자: Member
	 * 리턴타입: void
	 */
	
	void join (Member member) {
		this.members.add(member);
	}
	
	/** 로그인
	 * 기능: 회원 목록 전체에서 (for)
	 * 		 아이디, 비밀번호 &&로 비교
	 * 		 찾으면 결과에 따라 출력 다르게
	 * 
	 * 메소드명: login
	 * 전달인자: 아이디, 비밀번호
	 * 리턴타입: void
	 */
	
	boolean flag;
	void login (String id, String pw) {
		
		for (int i=0; i<this.members.size(); i++) {
			Member m = this.members.get(i);
			
			if (m.id.equals(id) && m.pw.equals(pw)) {
				flag = true;
				break;
			}
			
//			if (m.id.equals(id) && m.pw.equals(pw)) {
//				System.out.println("메인 페이지");
//			} else {
//				System.out.println("아이디 또는 비밀번호가 틀렸습니다. 다시 시도해주세요.");
//			} // if end
		} // for end
		
		if (flag) {
				System.out.println("메인 페이지");
		} else {
				System.out.println("아이디 또는 비밀번호가 틀렸습니다. 다시 시도해주세요.");
		}
		
	} // void login end
	
	
	
} // end
