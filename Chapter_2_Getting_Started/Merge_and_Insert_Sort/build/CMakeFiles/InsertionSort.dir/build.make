# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.16

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring/build

# Include any dependencies generated for this target.
include CMakeFiles/InsertionSort.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/InsertionSort.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/InsertionSort.dir/flags.make

CMakeFiles/InsertionSort.dir/src/main_insert.cpp.o: CMakeFiles/InsertionSort.dir/flags.make
CMakeFiles/InsertionSort.dir/src/main_insert.cpp.o: ../src/main_insert.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/InsertionSort.dir/src/main_insert.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/InsertionSort.dir/src/main_insert.cpp.o -c /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring/src/main_insert.cpp

CMakeFiles/InsertionSort.dir/src/main_insert.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/InsertionSort.dir/src/main_insert.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring/src/main_insert.cpp > CMakeFiles/InsertionSort.dir/src/main_insert.cpp.i

CMakeFiles/InsertionSort.dir/src/main_insert.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/InsertionSort.dir/src/main_insert.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring/src/main_insert.cpp -o CMakeFiles/InsertionSort.dir/src/main_insert.cpp.s

# Object files for target InsertionSort
InsertionSort_OBJECTS = \
"CMakeFiles/InsertionSort.dir/src/main_insert.cpp.o"

# External object files for target InsertionSort
InsertionSort_EXTERNAL_OBJECTS =

InsertionSort: CMakeFiles/InsertionSort.dir/src/main_insert.cpp.o
InsertionSort: CMakeFiles/InsertionSort.dir/build.make
InsertionSort: CMakeFiles/InsertionSort.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable InsertionSort"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/InsertionSort.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/InsertionSort.dir/build: InsertionSort

.PHONY : CMakeFiles/InsertionSort.dir/build

CMakeFiles/InsertionSort.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/InsertionSort.dir/cmake_clean.cmake
.PHONY : CMakeFiles/InsertionSort.dir/clean

CMakeFiles/InsertionSort.dir/depend:
	cd /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring/build /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring/build /home/alazzonir/Desktop/Data-Structures-and-Algorithms/Chapter_9_Soring/build/CMakeFiles/InsertionSort.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/InsertionSort.dir/depend

