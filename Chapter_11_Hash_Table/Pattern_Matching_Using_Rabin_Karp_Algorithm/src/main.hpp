#ifndef _RABIN_KARP_ALGORITHM_H_
#define _RABIN_KARP_ALGORITHM_H
#include<iostream>
#include<fstream>
#include<string>
#include<vector>
#include <boost/algorithm/string.hpp>
#include<cstdlib>
std::string reading_file(std::string path)
{
    std::ifstream myfile = std::ifstream(path, std::ios::in);
    std::string line;
    std::string output;
    if(myfile.is_open())
    {
        while(std::getline(myfile, line))
        {
            output += line;
        }
    }
    else{
        std::cout << "I wasn't able to find the file in the following path: " + path << std::endl;
    }
    output += '\n';
    //std::cout << output;
    return output;
}


//I will return a counter of occurance and the index of where the word was found in the text.
std::pair<int, std::vector<std::pair<int, std::string>>> bruteForce(std::string txt, std::string word)
{
    int counter = 0;
    std::vector<std::pair<int, std::string>> indexs;
    word = boost::algorithm::to_lower_copy(word);
    //std::cout << word << '\n';
    int lenWord = word.length();
    int lenText = txt.length();
    for(int ind=0; ind < lenText; ind++)
    {   
        std::string putativeMatch = boost::algorithm::to_lower_copy(txt.substr(ind, lenWord));
        //std::cout << putativeMatch << '\n';

        if(putativeMatch.compare(word) == 0)
        {
            counter +=1;
            int begin = ind - 10 > 0?ind-10: 0;
            int end = ind + lenWord + 10 < lenText?lenWord + 10  + (ind - begin): lenWord + 10;
            indexs.push_back(std::pair<int, std::string>(ind, txt.substr(begin, end)));
        }
    }    
    return std::pair<int, std::vector<std::pair<int, std::string>>>(counter, indexs);
}

std::pair<int, std::vector<std::pair<int, std::string>>> rabinKarp(std::string txt, std::string word, int primeNumber)
{
    int counter = 0;
    std::vector<std::pair<int, std::string>> indexs;
    word = boost::algorithm::to_lower_copy(word);
    //I will do hashing using division method, in which I will sum throgh the characters of the string of txt and word
    int charSize = 256;//a
    int shiftBase  = 1;//a^|u|-1 mod p
    int hashWord = 0;
    int hashSubText = 0;
    //std::cout << word << '\n';
    int lenWord = word.length();
    int lenText = txt.length();
    for(int i=0; i < lenWord - 1; i++)
    {
        shiftBase = (charSize * shiftBase)%primeNumber;
    }

    std::string putativeMatch = boost::algorithm::to_lower_copy(txt.substr(0, lenWord));

    //Calculat h(|s| from txt) and h(|s| from word)
    for(int i=0; i< lenWord; i++)
    {
        hashWord = (hashWord * charSize + word[i])%primeNumber;
        hashSubText = (hashSubText * charSize + putativeMatch[i])%primeNumber;
    }
    //IF the match was at the beginning.
    if( hashWord == hashSubText)
    {
        if(putativeMatch.compare(word) == 0)
        {
            counter += 1;
            indexs.push_back(std::pair<int, std::string>(0, txt.substr(0, 10)));
        }
    }
    char lastChar;
    for(int ind=lenWord; ind < lenText; ind++)
    {   
        lastChar = putativeMatch[0];
        putativeMatch = boost::algorithm::to_lower_copy(txt.substr(ind - lenWord + 1, lenWord));
        int begin = ind - lenWord - 10 > 0?ind - lenWord - 10: 0;
        int end = ind + 10 < lenText? 10 + (ind - begin): lenWord + 10 + 1;
        //std::cout << putativeMatch << '\n';
        if(ind + 1 < lenText)
        {
            //skip step
            hashSubText = (hashSubText - lastChar * shiftBase)%primeNumber;
            //append step
            hashSubText = (hashSubText * charSize + putativeMatch[lenWord -1]) %primeNumber;
            if(hashSubText < 0)
                hashSubText = hashSubText + primeNumber; // 0<x<primeNumber
        }
        //Is  h(k1)==h(k2)?
        if(hashWord == hashSubText)
        {
            //Is k1==k2?
            if(putativeMatch.compare(word) == 0)
            {
                counter += 1;
                indexs.push_back(std::pair<int, std::string>(ind - lenWord, txt.substr(begin, end)));
            }
        }
    }    
    return std::pair<int, std::vector<std::pair<int, std::string>>>(counter, indexs);
}



#endif /*_RABIN_KARP_ALGORITHM_H*/