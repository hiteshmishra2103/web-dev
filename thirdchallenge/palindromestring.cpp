#include <bits/stdc++.h>
using namespace std;
int main(){int n;
    cin>>n;
    char arr[n+1];
    cin>>arr;
    int i,j;
    for (i = 0, j=n-1; i <=j,j>=i; i++, j--)
    {
        if(arr[i]!=arr[j]){
            cout<<"this is not palindrome";
            return 0;
        }
    }
    cout<<"this is palindrome";
    
    return 0;
}