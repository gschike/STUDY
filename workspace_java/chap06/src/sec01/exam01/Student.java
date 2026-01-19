package sec01.exam01;

public class Student { // 클래스 선언의 중괄호
	
	Teacher t = new Teacher();
	
	String teacherName = t.name;
	String name = "홍세정";
	
	
} // Student end

class Teacher {
	
	String name = "최민수";
	
} // Teacher end
