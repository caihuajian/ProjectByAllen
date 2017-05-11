package com.cc.data.sort;

public class SortData {
	public int[] r = new int[11];
	int length;

	void printData() {
		String str = "";
		for (int i = 1; i < length+1; i++) {
			str += r[i] + ",";
		}
		System.out.println("data:[" + str+"]");
	}
}
