package Game2;

import java.util.ArrayList;

public class Maps {
	
	// 전체 지도
	ArrayList<String> mapList = new ArrayList<>();
	
	Maps() {
		mapList.add("태초마을"); // 0
		mapList.add("바람의 언덕"); // 1
		mapList.add("항구 도시"); // 2
	}
	
	String getMapIndex (int index) {
		
		String result ="";
		if (index <= mapList.size()) {
			result = mapList.get(index);
		} else {
			System.out.println("잘못 선택되었습니다");
		}
		
		return result;
	}
	
	void moveMap (User user, int index) {
		
		if (index >= 0 && index <= mapList.size()) {
			
			if (index == user.mapIndex) {
				System.out.println("이미 위치하고 있습니다");
				System.out.println();
			} else if (index >= user.level) {
				System.out.println("레벨이 부족하여 해당 지역으로 이동할 수 없습니다");
				System.out.println();
			} else {
				System.out.println(mapList.get(index) + "(으)로 이동합니다");
				user.mapIndex = index;
				System.out.println();
			}
			
		} else {
			System.out.println("잘못된 위치입니다");
		}
		
	}
	
}
