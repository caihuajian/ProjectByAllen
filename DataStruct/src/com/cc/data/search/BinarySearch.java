package com.cc.data.search;

public class BinarySearch {

	private static int[] data = new int[]{1,2,3,4,55,66,67,89,88,99,100};
	public static void main(String[] args) {
		// TODO Auto-generated method stub
  
		System.out.println(binarySearch(data.length-1, 99));
	}

	public static int binarySearch(int n,int key){
		int low,high,mid;
		low =0;
		high = n;
		
		while(low<=high){
			mid = (low+high)/2;
//			mid= low +(high-low)*((key - data[low])/(data[high]-data[low]));
			if(key<data[mid]){
				high = mid -1;
			}else if(key>data[mid]){
				low = mid+1;
			}else{
				return mid;
			}
			
		}
		return -1;
	}
}
