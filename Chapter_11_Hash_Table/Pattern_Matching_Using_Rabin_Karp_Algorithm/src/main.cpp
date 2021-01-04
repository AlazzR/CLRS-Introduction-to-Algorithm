#include "main.hpp"
#include<chrono>
int main(int argc, char** argv)
{
    std::cout << "BF implementation is faster than the Rabin-Karp algorithm because that I am using simple hash function--division method. Also, I am using small prime number which randomly generated to be in range of 0 to 255."<<std::endl;
    //cloths:3 , light:3 , dreams:3
    //std::string path= "../input_text.txt";
    std::string path= "../input_text_Poe.txt";//Will search for Poem->10 times


    std::string txt = reading_file(path);
    auto begin = std::chrono::high_resolution_clock::now();
    //std::pair<int, std::vector<std::pair<int, std::string>>> matches = bruteForce(txt, "light");
    std::pair<int, std::vector<std::pair<int, std::string>>> matches = bruteForce(txt, "Poem");

    /*
        BRUTE FORCE
    */
    std::cout << std::string(100, '-') << std::endl;
    std::cout << "Brute force match, number of matches: " << matches.first << " ,the matched where at the following indexs:\n";
    if(matches.second.size() == 0)
        std::cout << "No matches\n";
    else{
        for(auto match: matches.second)
            std::cout << "Index: " << match.first << " ,text encapsulating this match: " << match.second << std::endl;
    }
    
    auto end = std::chrono::high_resolution_clock::now();
    std::cout << "Took the following duration: " << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count() << " microseconds\n";
    std::cout << std::string(100, '-') << std::endl;
    /*
        Rabin Karp Algorithm
    */
    //Rabin Karp algorithm, I willn't take into account the generation of a random prime number
    int p = std::rand() % 256;
    bool flag = true;
    while(flag)
    {
        for(int i=2; i <= p/2; i++)
        {
            if(p%i == 0)
                {
                    flag = false;
                    break;
                }
        }
        if(!flag)
        {
            p = std::rand() % 256;
            flag = true;
        }
        else
        {
            flag = false;
        }
    }
    std::cout << "Prime number: " << p << '\n';
    begin = std::chrono::high_resolution_clock::now();
    //std::pair<int, std::vector<std::pair<int, std::string>>> matchesKarp = rabinKarp(txt, "light", p);
    std::pair<int, std::vector<std::pair<int, std::string>>> matchesKarp = rabinKarp(txt, "Poem", p);

    std::cout << std::string(100, '-') << std::endl;
    std::cout << "Rabin-Karp matching, number of matches: " << matchesKarp.first << " ,the matched where at the following indexs:\n";
    if(matchesKarp.second.size() == 0)
        std::cout << "No matches\n";
    else{
        for(auto match: matchesKarp.second)
            std::cout << "Index: " << match.first << " ,text encapsulating this match: " << match.second << std::endl;
    }
    
    end = std::chrono::high_resolution_clock::now();
    std::cout << "Took the following duration: " << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count() << " microseconds\n";
    std::cout << std::string(100, '-') << std::endl;
    return 0;
}