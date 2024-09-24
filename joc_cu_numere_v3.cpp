#include <iostream>

using namespace std;

struct numar{
    int id;
}v[11];

int main()
{
    int nr[5] = {-1, -1, -1, -1, -1}, cnt_k = 0, cnt = 0, i = 0, guesses = 0;
    int zero = 0;
    bool ok, ok_nr;
    for(int j = 0; j <= 9; j++)
    {
        v[j].id = 0;
    }
    ok = 1;
    i = 0;
    do
    {
        int cnt2;
        int j = 4;
        if(i != 9 && (cnt != 4 || zero == 0))
        {
            cout << "new guess: ";
            guesses++;
            while(j)
            {
                cout << i;
                j--;
            }
            cout << '\n';
            cin >> cnt2;
            cnt += cnt2;
            v[i].id = cnt2;
            if(cnt == 4 && zero == 0)
            {
                v[++i].id = -1;
                zero++;
            }
        }
        else
        {
            if(cnt < 4)
            {
                v[9].id = 4 - cnt;
                cnt = 4;
                cnt2 = 4 - cnt;
            }
        }
            if(cnt == 4 && cnt2 != 4)
            {
                if(zero > 0)
                {
                    int index = 0;
                    cnt_k = 0;
                    while(index <= 9)
                    {
                        if(v[index].id > 0)
                        {
                            int p;
                            for(p = 0; p < 9; p++)
                                if(v[p].id == -1)
                                    break;
                            if(nr[1] == -1 && cnt_k < 4)
                            {
                                ok_nr = 0;
                                if(nr[2] != -1 && nr[3] != -1 && nr[4] != -1)
                                {
                                    nr[1] = index;
                                    v[index].id--;
                                    cnt_k++;
                                }
                                else if(nr[4] != -1 && v[index].id == 3)
                                {
                                    nr[1] = index;
                                    nr[2] = index;
                                    nr[3] = index;
                                    v[index].id = 0;
                                    cnt_k += 3;
                                }
                                else if(nr[2] != -1 && nr[3] != -1 && nr[4] != -1 && v[index].id == 1)
                                {
                                    nr[1] = index;
                                    v[index].id = 0;
                                    cnt_k++;
                                }
                                else if(nr[3] != -1 && nr[4] != -1 && nr[2] == -1 && v[index].id == 2)
                                {
                                    nr[1] = index;
                                    nr[2] = index;
                                    v[index].id = 0;
                                    cnt_k += 2;
                                }
                                else if(nr[2] != -1 && nr[4] != -1 && v[index].id == 2)
                                {
                                    nr[1] = index;
                                    nr[3] = index;
                                    v[index].id = 0;
                                    cnt_k += 2;
                                }
                                else
                                {
                                    cout << "new guess: ";
                                    guesses++;
                                    cout << index << p << p << p << '\n';
                                    cin >> ok_nr;
                                    if(ok_nr == 1)
                                    {
                                        nr[1] = index;
                                        cnt_k++;
                                        v[index].id--;
                                    }
                                }
                            }
                            if(nr[2] == -1 && cnt_k < 4 && v[index].id != 0)
                            {
                                ok_nr = 0;
                                if(v[index].id == 3)
                                {
                                    nr[2] = index;
                                    nr[3] = index;
                                    nr[4] = index;
                                    v[index].id = 0;
                                    cnt_k += 3;
                                }
                                else if(nr[4] != -1 && nr[3] == -1 && v[index].id == 2)
                                {
                                    nr[2] = index;
                                    nr[3] = index;
                                    v[index].id = 0;
                                    cnt_k += 2;
                                }
                                else if(nr[1] != -1 && nr[3] != -1 && nr[4] != -1 && v[index].id == 1)
                                {
                                    nr[2] = index;
                                    v[index].id = 0;
                                    cnt_k++;
                                }
                                else if(nr[4] != -1 && nr[3] != -1 && v[index].id == 1)//might break here
                                {
                                    nr[2] = index;
                                    v[index].id = 0;
                                    cnt_k++;
                                }
                                else if(nr[1] != -1 && nr[3] != -1 && v[index].id == 2)
                                {
                                    nr[2] = index;
                                    nr[4] = index;
                                    v[index].id = 0;
                                    cnt_k += 2;
                                }
                                else
                                {
                                    cout << "new guess: ";
                                    guesses++;
                                    cout << p << index << p << p << '\n';
                                    cin >> ok_nr;
                                    if(ok_nr == 1)
                                    {
                                        nr[2] = index;
                                        cnt_k++;
                                        v[index].id--;
                                    }
                                }
                            }
                            if(nr[3] == -1 && cnt_k < 4 && v[index].id != 0)
                            {
                                ok_nr = 0;
                                if(v[index].id == 2 && nr[4] == -1)
                                {
                                    nr[3] = index;
                                    nr[4] = index;
                                    cnt_k += 2;
                                    v[index].id = 0;
                                }
                                else if(nr[4] != -1 && v[index].id == 1)
                                {
                                    nr[3] = index;
                                    v[index].id = 0;
                                    cnt_k++;
                                }
                                else
                                {
                                    cout << "new guess: ";
                                    guesses++;
                                    cout << p << p << index << p << '\n';
                                    cin >> ok_nr;
                                    if(ok_nr == 1)
                                    {
                                        nr[3] = index;
                                        cnt_k++;
                                        v[index].id--;
                                    }
                                }
                            }
                            if(nr[4] == -1 && cnt_k < 4 && v[index].id != 0)
                            {
                                ok_nr = 0;
                                if(v[index].id == 1)
                                {
                                    nr[4] = index;
                                    cnt_k++;
                                    v[index].id--;
                                }
                                else
                                {
                                    cout << "new guess: ";
                                    guesses++;
                                    cout << p << p << p << index << '\n';
                                    cin >> ok_nr;
                                    if(ok_nr == 1)
                                    {
                                        nr[4] = index;
                                        cnt_k++;
                                        v[index].id--;
                                    }
                                }
                            }
                        }
                        index++;
                        if(cnt_k == cnt && cnt == 4)
                        {
                            //for(int l = 0; l <= 9; l++)
                            //    cout << "s=" << v[l].cnt;
                            cout << "guessed number is: " << nr[1] << nr[2] << nr[3] << nr[4];
                            cout << "\nguessed in: " << guesses << " tries.";
                            return 0;
                        }
                    }
                }
            }
        if(cnt2 == 0)
            {
                zero++;
                v[i].id = -1;
                if(cnt == 4)
                {
                    int index = 0;
                    cnt_k = 0;
                    while(index <= 9)
                    {
                        if(v[index].id > 0)
                        {
                            int p;
                            for(p = 0; p < 9; p++)
                                if(v[p].id == -1)
                                    break;
                            if(nr[1] == -1 && cnt_k < 4)
                            {
                                ok_nr = 0;
                                if(nr[2] != -1 && nr[3] != -1 && nr[4] != -1)
                                {
                                    nr[1] = index;
                                    v[index].id--;
                                    cnt_k++;
                                }
                                else if(nr[4] != -1 && v[index].id == 3)
                                {
                                    nr[1] = index;
                                    nr[2] = index;
                                    nr[3] = index;
                                    v[index].id = 0;
                                    cnt_k += 3;
                                }
                                else if(nr[2] != -1 && nr[3] != -1 && nr[4] != -1 && v[index].id == 1)
                                {
                                    nr[1] = index;
                                    v[index].id = 0;
                                    cnt_k++;
                                }
                                else if(nr[3] != -1 && nr[4] != -1 && nr[2] == -1 && v[index].id == 2)
                                {
                                    nr[1] = index;
                                    nr[2] = index;
                                    v[index].id = 0;
                                    cnt_k += 2;
                                }
                                else if(nr[2] != -1 && nr[4] != -1 && v[index].id == 2)//might break
                                {
                                    nr[1] = index;
                                    nr[3] = index;
                                    v[index].id = 0;
                                    cnt_k += 2;
                                }
                                else
                                {
                                    cout << "new guess: ";
                                    guesses++;
                                    cout << index << p << p << p << '\n';
                                    cin >> ok_nr;
                                    if(ok_nr == 1)
                                    {
                                        nr[1] = index;
                                        cnt_k++;
                                        v[index].id--;
                                    }
                                }
                            }
                            if(nr[2] == -1 && cnt_k < 4 && v[index].id != 0)
                            {
                                ok_nr = 0;
                                if(v[index].id == 3)
                                {
                                    nr[2] = index;
                                    nr[3] = index;
                                    nr[4] = index;
                                    v[index].id = 0;
                                    cnt_k += 3;
                                }
                                else if(nr[4] != -1 && nr[3] == -1 && v[index].id == 2)
                                {
                                    nr[2] = index;
                                    nr[3] = index;
                                    v[index].id = 0;
                                    cnt_k += 2;
                                }
                                else if(nr[1] != -1 && nr[3] != -1 && nr[4] != -1 && v[index].id == 1)
                                {
                                    nr[2] = index;
                                    v[index].id = 0;
                                    cnt_k++;
                                }
                                else if(nr[4] != -1 && nr[3] != -1 && v[index].id == 1)//might break here
                                {
                                    nr[2] = index;
                                    v[index].id = 0;
                                    cnt_k++;
                                }
                                else if(nr[1] != -1 && nr[3] != -1 && v[index].id == 2)
                                {
                                    nr[2] = index;
                                    nr[4] = index;
                                    v[index].id = 0;
                                    cnt_k += 2;
                                }
                                else
                                {
                                    cout << "new guess: ";
                                    guesses++;
                                    cout << p << index << p << p << '\n';
                                    cin >> ok_nr;
                                    if(ok_nr == 1)
                                    {
                                        nr[2] = index;
                                        cnt_k++;
                                        v[index].id--;
                                    }
                                }
                            }
                            if(nr[3] == -1 && cnt_k < 4 && v[index].id != 0)
                            {
                                ok_nr = 0;
                                if(v[index].id == 2 && nr[4] == -1)
                                {
                                    nr[3] = index;
                                    nr[4] = index;
                                    cnt_k += 2;
                                    v[index].id = 0;
                                }
                                else if(nr[4] != -1 && v[index].id == 1)
                                {
                                    nr[3] = index;
                                    v[index].id = 0;
                                    cnt_k++;
                                }
                                else
                                {
                                    cout << "new guess: ";
                                    guesses++;
                                    cout << p << p << index << p << '\n';
                                    cin >> ok_nr;
                                    if(ok_nr == 1)
                                    {
                                        nr[3] = index;
                                        cnt_k++;
                                        v[index].id--;
                                    }
                                }
                            }
                            if(nr[4] == -1 && cnt_k < 4 && v[index].id != 0)
                            {
                                ok_nr = 0;
                                if(v[index].id == 1)
                                {
                                    nr[4] = index;
                                    cnt_k++;
                                    v[index].id--;
                                }
                                else
                                {
                                    cout << "new guess: ";
                                    guesses++;
                                    cout << p << p << p << index << '\n';
                                    cin >> ok_nr;
                                    if(ok_nr == 1)
                                    {
                                        nr[4] = index;
                                        cnt_k++;
                                        v[index].id--;
                                    }
                                }
                            }
                        }
                        index++;
                        if(cnt_k == cnt && cnt == 4)
                        {
                            //for(int l = 0; l <= 9; l++)
                            //    cout << "s=" << v[l].cnt;
                            cout << "guessed number is: " << nr[1] << nr[2] << nr[3] << nr[4];
                            cout << "\nguessed in: " << guesses << " tries.";
                            return 0;
                        }
                    }
                }
            }
        if(cnt2 == 4)
                    {
                        //for(int l = 0; l <= 9; l++)
                        //    cout << "s=" << v[l].cnt;
                        cout << "guessed number is: " << i << i << i << i;
                        cout << "\nguessed in: " << guesses << " tries.";
                        return 0;
                    }
        i++;
    }while(ok && i < 10);
    return 0;
}
