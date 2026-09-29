export const learningModules = [
  {
    "day": 1,
    "phase": {
      "vi": "Java Core & Modern Features",
      "en": "Java Core and Modern Features"
    },
    "title": {
      "vi": "Cú pháp, Kiểu dữ liệu & Cơ chế bộ nhớ",
      "en": "Syntax, Data Types & Memory Management"
    },
    "description": {
      "vi": "Tìm hiểu các khái niệm cơ bản nhất của Java, phân biệt kiểu dữ liệu nguyên thủy (primitive) và đối tượng, cùng cách máy ảo Java (JVM) quản lý bộ nhớ.",
      "en": "Learn the most fundamental concepts of Java, distinguish between primitive and object types, and understand how the JVM manages memory."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Viết chương trình Java đầu tiên",
        "Hiểu sự khác biệt giữa primitive và wrapper",
        "Nắm rõ cách Stack và Heap hoạt động"
      ],
      "en": [
        "Write your first Java program",
        "Understand primitive vs wrapper types",
        "Know how Stack and Heap work"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l1-1",
        "title": {
          "vi": "Kiểu dữ liệu & Type Casting",
          "en": "Data Types & Type Casting"
        },
        "explanation": {
          "vi": "Java có 8 kiểu nguyên thủy (int, boolean, double...). Type casting cho phép chuyển đổi giữa chúng. Ép kiểu rộng (widening) diễn ra tự động, ép kiểu hẹp (narrowing) cần khai báo tường minh và có thể mất dữ liệu.",
          "en": "Java has 8 primitive types. Type casting allows conversion. Widening is automatic, narrowing requires explicit casting and can lose precision."
        },
        "keyPoints": [
          "Primitives: int, double, boolean",
          "Wrapper classes: Integer, Double",
          "Auto-boxing/Unboxing"
        ],
        "codeExample": "int a = 10; double b = a; // widening\ndouble c = 10.5; int d = (int) c; // narrowing",
        "commonMistakes": [
          "Quên ép kiểu khi chia hai số nguyên (vd: 5/2 = 2 thay vì 2.5)"
        ],
        "resources": []
      },
      {
        "id": "l1-2",
        "title": {
          "vi": "Stack, Heap & Garbage Collection",
          "en": "Stack, Heap & Garbage Collection"
        },
        "explanation": {
          "vi": "Stack lưu các biến cục bộ và lời gọi hàm. Heap lưu các đối tượng. Garbage Collector (GC) tự động dọn dẹp các đối tượng trên Heap không còn ai tham chiếu tới.",
          "en": "Stack stores local variables/method calls. Heap stores objects. Garbage Collector automatically cleans up unreferenced objects on the Heap."
        },
        "keyPoints": [
          "Stack is fast, LIFO",
          "Heap is large, dynamic",
          "GC prevents memory leaks"
        ],
        "codeExample": "String s = new String(\"Hello\"); // 's' is on Stack, object is on Heap",
        "commonMistakes": [
          "Tạo quá nhiều object không cần thiết gây tràn Heap (OutOfMemoryError)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v1-1",
        "title": "Java Memory Management",
        "url": "https://www.youtube.com/watch?v=7gQG-s3E0yQ",
        "duration": "15:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Primitive Data Types",
        "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html",
        "provider": "Oracle",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p1",
      "title": "Student Score Analyzer",
      "description": "Write a program to calculate average scores using primitive types.",
      "requirements": [
        "Use int and double",
        "Demonstrate type casting"
      ],
      "hints": [
        "Remember integer division behavior"
      ],
      "difficulty": "EASY",
      "estimatedMinutes": 30
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_1_task_1",
        "title": "Cú pháp cơ bản, kiểu dữ liệu primitive vs object wrapper, type casting",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_1_task_2",
        "title": "Cơ chế quản lý bộ nhớ: Stack vs Heap, cơ chế Garbage Collection",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 2,
    "phase": {
      "vi": "Java Core & Modern Features",
      "en": "Java Core and Modern Features"
    },
    "title": {
      "vi": "OOP Chuyên sâu trong Java",
      "en": "Advanced OOP in Java"
    },
    "description": {
      "vi": "Nắm vững 4 tính chất cơ bản của Lập trình hướng đối tượng và cách sử dụng các từ khóa quan trọng như final, static.",
      "en": "Master the 4 pillars of Object-Oriented Programming and understand keywords like final and static."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu tính Đóng gói, Kế thừa, Đa hình, Trừu tượng",
        "Sử dụng abstract class và interface",
        "Biết khi nào dùng static/final"
      ],
      "en": [
        "Understand Encapsulation, Inheritance, Polymorphism, Abstraction",
        "Use abstract class and interface",
        "Know when to use static/final"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l2-1",
        "title": {
          "vi": "4 Tính chất OOP",
          "en": "4 Pillars of OOP"
        },
        "explanation": {
          "vi": "Đóng gói bảo vệ dữ liệu. Kế thừa tái sử dụng code. Đa hình cho phép đối tượng ứng xử khác nhau. Trừu tượng ẩn đi chi tiết cài đặt.",
          "en": "Encapsulation protects data. Inheritance reuses code. Polymorphism allows varying behavior. Abstraction hides implementation details."
        },
        "keyPoints": [
          "Encapsulation: private fields + getters/setters",
          "Polymorphism: Overloading vs Overriding"
        ],
        "codeExample": "class Animal { void makeSound() { System.out.println(\"...\"); } }\nclass Dog extends Animal { @Override void makeSound() { System.out.println(\"Woof\"); } }",
        "commonMistakes": [
          "Hiểu sai Overloading (compile-time) và Overriding (run-time)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v2-1",
        "title": "Object-Oriented Programming in Java",
        "url": "https://www.youtube.com/watch?v=a199KZGMNxk",
        "duration": "20:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Classes and Objects",
        "url": "https://docs.oracle.com/javase/tutorial/java/javaOO/",
        "provider": "Oracle",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p2",
      "title": "Banking System",
      "description": "Design a simple banking system with interfaces.",
      "requirements": [
        "Abstract Account class",
        "Checking and Savings implementations"
      ],
      "hints": [
        "Use polymorphism"
      ],
      "difficulty": "EASY",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_2_task_1",
        "title": "4 tính chất OOP, abstract class vs interface",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_2_task_2",
        "title": "Từ khóa final, static; tính bất biến với Record (Java 16+)",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 3,
    "phase": {
      "vi": "Java Core & Modern Features",
      "en": "Java Core and Modern Features"
    },
    "title": {
      "vi": "Collections Framework I (List & Set)",
      "en": "Collections Framework I (List & Set)"
    },
    "description": {
      "vi": "Làm quen với hệ thống Collection trong Java, tập trung vào cấu trúc dữ liệu dạng danh sách và tập hợp không trùng lặp.",
      "en": "Familiarize yourself with the Java Collections framework, focusing on lists and sets with unique elements."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Sử dụng ArrayList và LinkedList hiệu quả",
        "Hiểu bản chất của HashSet và TreeSet"
      ],
      "en": [
        "Use ArrayList and LinkedList effectively",
        "Understand HashSet and TreeSet"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l3-1",
        "title": {
          "vi": "ArrayList vs LinkedList",
          "en": "ArrayList vs LinkedList"
        },
        "explanation": {
          "vi": "ArrayList sử dụng mảng động (truy cập O(1), chèn chậm O(n)). LinkedList sử dụng danh sách liên kết (truy cập O(n), chèn nhanh ở đầu/cuối O(1)).",
          "en": "ArrayList uses a dynamic array (O(1) access, O(n) insert). LinkedList uses nodes (O(n) access, O(1) insert at ends)."
        },
        "keyPoints": [
          "ArrayList: fast access",
          "LinkedList: fast insertion/deletion at endpoints"
        ],
        "codeExample": "List<String> list = new ArrayList<>();\nlist.add(\"Java\");",
        "commonMistakes": [
          "Dùng LinkedList khi cần truy cập ngẫu nhiên liên tục"
        ],
        "resources": []
      },
      {
        "id": "l3-2",
        "title": {
          "vi": "HashSet và equals/hashCode",
          "en": "HashSet and equals/hashCode"
        },
        "explanation": {
          "vi": "Set không chứa phần tử trùng. HashSet dựa vào hashCode() và equals() để xác định sự trùng lặp.",
          "en": "Sets prevent duplicates. HashSet relies on hashCode() and equals() to find duplicates."
        },
        "keyPoints": [
          "Always override equals() and hashCode() together"
        ],
        "codeExample": "Set<Integer> set = new HashSet<>(); set.add(1); set.add(1); // set size is 1",
        "commonMistakes": [
          "Quên override hashCode khi override equals"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v3-1",
        "title": "Java Collections Framework",
        "url": "https://www.youtube.com/watch?v=viZWzzqnb7M",
        "duration": "25:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "The Collections Framework",
        "url": "https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html",
        "provider": "Oracle",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p3",
      "title": "Product Inventory",
      "description": "Manage unique products using Set and List.",
      "requirements": [
        "Implement equals/hashCode for Product class",
        "Store in HashSet"
      ],
      "hints": [
        "Use IDE to generate equals/hashCode"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_3_task_1",
        "title": "ArrayList vs LinkedList (độ phức tạp O(1) vs O(n))",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_3_task_2",
        "title": "HashSet, TreeSet và quy tắc bắt buộc override equals() & hashCode()",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 4,
    "phase": {
      "vi": "Java Core & Modern Features",
      "en": "Java Core and Modern Features"
    },
    "title": {
      "vi": "Collections Framework II (Map & Queue)",
      "en": "Collections Framework II (Map & Queue)"
    },
    "description": {
      "vi": "Khám phá cấu trúc dữ liệu Map (Key-Value) và Queue trong Java, đi sâu vào thuật toán nội suy của HashMap.",
      "en": "Explore the Map (Key-Value) and Queue data structures in Java, diving deep into HashMap internals."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu cơ chế bucket và hash collision của HashMap",
        "Sử dụng Queue cho xử lý luồng công việc"
      ],
      "en": [
        "Understand bucket mechanism and hash collisions in HashMap",
        "Use Queue for workflow processing"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l4-1",
        "title": {
          "vi": "Cơ chế nội suy HashMap",
          "en": "HashMap Internals"
        },
        "explanation": {
          "vi": "HashMap lưu dữ liệu dạng key-value. Nó dùng bucket (mảng) kết hợp linked list / red-black tree để giải quyết hash collision (đụng độ băm).",
          "en": "HashMap stores key-value pairs. It uses an array of buckets, resolving collisions with linked lists or red-black trees."
        },
        "keyPoints": [
          "O(1) average lookup",
          "O(log n) in worst case (treeification)"
        ],
        "codeExample": "Map<String, Integer> map = new HashMap<>();\nmap.put(\"Alice\", 25);",
        "commonMistakes": [
          "Sử dụng đối tượng mutable làm Key trong Map"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v4-1",
        "title": "How HashMap works in Java",
        "url": "https://www.youtube.com/watch?v=c3RVW3KGIIE",
        "duration": "12:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Map Interface",
        "url": "https://docs.oracle.com/javase/tutorial/collections/interfaces/map.html",
        "provider": "Oracle",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p4",
      "title": "Product Price Lookup",
      "description": "Build a fast lookup system for product prices.",
      "requirements": [
        "Use HashMap",
        "Handle missing keys safely"
      ],
      "hints": [
        "Use map.getOrDefault()"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 30
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_4_task_1",
        "title": "HashMap nội suy: bucket array, hash collision, red-black tree",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_4_task_2",
        "title": "LinkedHashMap, TreeMap, PriorityQueue và các cách duyệt Map tối ưu",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 5,
    "phase": {
      "vi": "Java Core & Modern Features",
      "en": "Java Core and Modern Features"
    },
    "title": {
      "vi": "Exception Handling & Optionals",
      "en": "Exception Handling & Optionals (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Exception Handling & Optionals. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Exception Handling & Optionals. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l5-1",
        "title": {
          "vi": "Checked vs Unchecked Exceptions, khối try-with-resources",
          "en": "Checked vs Unchecked Exceptions, khối try-with-resources (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Checked vs Unchecked Exceptions, khối try-with-resources. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Checked vs Unchecked Exceptions, khối try-with-resources. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Checked vs Unchecked Exceptions, khối try-with-resources\nSystem.out.println(\"Learning day \" + 5);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l5-2",
        "title": {
          "vi": "Custom Exception và xử lý triệt để NullPointerException với Optional",
          "en": "Custom Exception và xử lý triệt để NullPointerException với Optional (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Custom Exception và xử lý triệt để NullPointerException với Optional. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Custom Exception và xử lý triệt để NullPointerException với Optional. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Custom Exception và xử lý triệt để NullPointerException với Optional\nSystem.out.println(\"Learning day \" + 5);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v5-1",
        "title": "Java Masterclass Day 5",
        "url": "https://www.youtube.com/watch?v=1XAfapkBQjk",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Exception Handling & Optionals",
        "url": "https://docs.oracle.com/javase/tutorial/essential/exceptions/",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p5",
      "title": "Exercise for Day 5",
      "description": "Practice the concepts learned in Day 5.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_5_task_1",
        "title": "Checked vs Unchecked Exceptions, khối try-with-resources",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_5_task_2",
        "title": "Custom Exception và xử lý triệt để NullPointerException với Optional",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 6,
    "phase": {
      "vi": "Java Core & Modern Features",
      "en": "Java Core and Modern Features"
    },
    "title": {
      "vi": "Functional Programming & Stream API I",
      "en": "Functional Programming & Stream API I (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Functional Programming & Stream API I. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Functional Programming & Stream API I. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l6-1",
        "title": {
          "vi": "Lambda Expressions cú pháp và cơ chế",
          "en": "Lambda Expressions cú pháp và cơ chế (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Lambda Expressions cú pháp và cơ chế. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Lambda Expressions cú pháp và cơ chế. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Lambda Expressions cú pháp và cơ chế\nSystem.out.println(\"Learning day \" + 6);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l6-2",
        "title": {
          "vi": "Built-in Functional Interfaces: Predicate, Function, Consumer, Supplier",
          "en": "Built-in Functional Interfaces: Predicate, Function, Consumer, Supplier (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Built-in Functional Interfaces: Predicate, Function, Consumer, Supplier. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Built-in Functional Interfaces: Predicate, Function, Consumer, Supplier. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Built-in Functional Interfaces: Predicate, Function, Consumer, Supplier\nSystem.out.println(\"Learning day \" + 6);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v6-1",
        "title": "Java Masterclass Day 6",
        "url": "https://www.youtube.com/watch?v=tj5sLSFjVj4",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Functional Programming & Stream API I",
        "url": "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p6",
      "title": "Exercise for Day 6",
      "description": "Practice the concepts learned in Day 6.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_6_task_1",
        "title": "Lambda Expressions cú pháp và cơ chế",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_6_task_2",
        "title": "Built-in Functional Interfaces: Predicate, Function, Consumer, Supplier",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 7,
    "phase": {
      "vi": "Java Core & Modern Features",
      "en": "Java Core and Modern Features"
    },
    "title": {
      "vi": "Stream API II (Thao tác dữ liệu)",
      "en": "Stream API II (Thao tác dữ liệu) (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Stream API II (Thao tác dữ liệu). Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Stream API II (Thao tác dữ liệu). This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l7-1",
        "title": {
          "vi": "Intermediate operations: filter, map, flatMap, sorted, distinct",
          "en": "Intermediate operations: filter, map, flatMap, sorted, distinct (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Intermediate operations: filter, map, flatMap, sorted, distinct. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Intermediate operations: filter, map, flatMap, sorted, distinct. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Intermediate operations: filter, map, flatMap, sorted, distinct\nSystem.out.println(\"Learning day \" + 7);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l7-2",
        "title": {
          "vi": "Terminal operations: collect, reduce, count, findFirst, anyMatch",
          "en": "Terminal operations: collect, reduce, count, findFirst, anyMatch (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Terminal operations: collect, reduce, count, findFirst, anyMatch. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Terminal operations: collect, reduce, count, findFirst, anyMatch. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Terminal operations: collect, reduce, count, findFirst, anyMatch\nSystem.out.println(\"Learning day \" + 7);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v7-1",
        "title": "Java Masterclass Day 7",
        "url": "https://www.youtube.com/watch?v=t1-YZ6bF-g0",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Stream API II (Thao tác dữ liệu)",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p7",
      "title": "Exercise for Day 7",
      "description": "Practice the concepts learned in Day 7.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_7_task_1",
        "title": "Intermediate operations: filter, map, flatMap, sorted, distinct",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_7_task_2",
        "title": "Terminal operations: collect, reduce, count, findFirst, anyMatch",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 8,
    "phase": {
      "vi": "Java Core & Modern Features",
      "en": "Java Core and Modern Features"
    },
    "title": {
      "vi": "Multithreading & Virtual Threads",
      "en": "Multithreading & Virtual Threads (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Multithreading & Virtual Threads. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Multithreading & Virtual Threads. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l8-1",
        "title": {
          "vi": "Vòng đời Thread, Runnable, Callable, ExecutorService pool",
          "en": "Vòng đời Thread, Runnable, Callable, ExecutorService pool (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Vòng đời Thread, Runnable, Callable, ExecutorService pool. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Vòng đời Thread, Runnable, Callable, ExecutorService pool. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Vòng đời Thread, Runnable, Callable, ExecutorService pool\nSystem.out.println(\"Learning day \" + 8);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l8-2",
        "title": {
          "vi": "Virtual Threads (Java 21) và cơ chế xử lý đồng thời non-blocking",
          "en": "Virtual Threads (Java 21) và cơ chế xử lý đồng thời non-blocking (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Virtual Threads (Java 21) và cơ chế xử lý đồng thời non-blocking. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Virtual Threads (Java 21) và cơ chế xử lý đồng thời non-blocking. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Virtual Threads (Java 21) và cơ chế xử lý đồng thời non-blocking\nSystem.out.println(\"Learning day \" + 8);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v8-1",
        "title": "Java Masterclass Day 8",
        "url": "https://www.youtube.com/watch?v=t1-YZ6bF-g0",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Multithreading & Virtual Threads",
        "url": "https://docs.oracle.com/javase/tutorial/collections/streams/",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p8",
      "title": "Exercise for Day 8",
      "description": "Practice the concepts learned in Day 8.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_8_task_1",
        "title": "Vòng đời Thread, Runnable, Callable, ExecutorService pool",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_8_task_2",
        "title": "Virtual Threads (Java 21) và cơ chế xử lý đồng thời non-blocking",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 9,
    "phase": {
      "vi": "Build Tool & Spring Core Architecture",
      "en": "Build Tool and Spring Core Architecture"
    },
    "title": {
      "vi": "Quản lý dự án với Maven",
      "en": "Quản lý dự án với Maven (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Quản lý dự án với Maven. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Quản lý dự án với Maven. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l9-1",
        "title": {
          "vi": "Cấu trúc thư mục chuẩn Maven và file pom.xml",
          "en": "Cấu trúc thư mục chuẩn Maven và file pom.xml (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Cấu trúc thư mục chuẩn Maven và file pom.xml. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Cấu trúc thư mục chuẩn Maven và file pom.xml. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Cấu trúc thư mục chuẩn Maven và file pom.xml\nSystem.out.println(\"Learning day \" + 9);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l9-2",
        "title": {
          "vi": "Dependency Scopes (compile, test, provided, runtime) và lifecycle build",
          "en": "Dependency Scopes (compile, test, provided, runtime) và lifecycle build (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Dependency Scopes (compile, test, provided, runtime) và lifecycle build. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Dependency Scopes (compile, test, provided, runtime) và lifecycle build. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Dependency Scopes (compile, test, provided, runtime) và lifecycle build\nSystem.out.println(\"Learning day \" + 9);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v9-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=W5_W1cI33Lg",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Quản lý dự án với Maven",
        "url": "https://docs.oracle.com/javase/tutorial/essential/io/",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p9",
      "title": "Exercise for Day 9",
      "description": "Practice the concepts learned in Day 9.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_9_task_1",
        "title": "Cấu trúc thư mục chuẩn Maven và file pom.xml",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_9_task_2",
        "title": "Dependency Scopes (compile, test, provided, runtime) và lifecycle build",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 10,
    "phase": {
      "vi": "Build Tool & Spring Core Architecture",
      "en": "Build Tool and Spring Core Architecture"
    },
    "title": {
      "vi": "Spring Core: Inversion of Control (IoC) & Bean",
      "en": "Spring Core: Inversion of Control (IoC) & Bean (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Spring Core: Inversion of Control (IoC) & Bean. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Spring Core: Inversion of Control (IoC) & Bean. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l10-1",
        "title": {
          "vi": "Khái niệm IoC Container và vòng đời của Spring Bean",
          "en": "Khái niệm IoC Container và vòng đời của Spring Bean (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Khái niệm IoC Container và vòng đời của Spring Bean. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Khái niệm IoC Container và vòng đời của Spring Bean. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Khái niệm IoC Container và vòng đời của Spring Bean\nSystem.out.println(\"Learning day \" + 10);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l10-2",
        "title": {
          "vi": "Stereotype Annotations: @Component, @Service, @Repository, @Configuration, @Bean",
          "en": "Stereotype Annotations: @Component, @Service, @Repository, @Configuration, @Bean (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Stereotype Annotations: @Component, @Service, @Repository, @Configuration, @Bean. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Stereotype Annotations: @Component, @Service, @Repository, @Configuration, @Bean. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Stereotype Annotations: @Component, @Service, @Repository, @Configuration, @Bean\nSystem.out.println(\"Learning day \" + 10);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v10-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=TCd8QIS-2KI",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Spring Core: Inversion of Control (IoC) & Bean",
        "url": "https://docs.oracle.com/javase/tutorial/essential/concurrency/",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p10",
      "title": "Exercise for Day 10",
      "description": "Practice the concepts learned in Day 10.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_10_task_1",
        "title": "Khái niệm IoC Container và vòng đời của Spring Bean",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_10_task_2",
        "title": "Stereotype Annotations: @Component, @Service, @Repository, @Configuration, @Bean",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 11,
    "phase": {
      "vi": "Build Tool & Spring Core Architecture",
      "en": "Build Tool and Spring Core Architecture"
    },
    "title": {
      "vi": "Dependency Injection (DI) Chuyên sâu",
      "en": "Dependency Injection (DI) Chuyên sâu (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Dependency Injection (DI) Chuyên sâu. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Dependency Injection (DI) Chuyên sâu. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l11-1",
        "title": {
          "vi": "So sánh Field Injection (@Autowired) vs Constructor Injection",
          "en": "So sánh Field Injection (@Autowired) vs Constructor Injection (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về So sánh Field Injection (@Autowired) vs Constructor Injection. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of So sánh Field Injection (@Autowired) vs Constructor Injection. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for So sánh Field Injection (@Autowired) vs Constructor Injection\nSystem.out.println(\"Learning day \" + 11);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l11-2",
        "title": {
          "vi": "Xử lý xung đột injection với @Primary và @Qualifier",
          "en": "Xử lý xung đột injection với @Primary và @Qualifier (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Xử lý xung đột injection với @Primary và @Qualifier. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Xử lý xung đột injection với @Primary và @Qualifier. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Xử lý xung đột injection với @Primary và @Qualifier\nSystem.out.println(\"Learning day \" + 11);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v11-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=Y8ZEK1L2UqY",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Dependency Injection (DI) Chuyên sâu",
        "url": "https://docs.oracle.com/javase/tutorial/essential/concurrency/highlevel.html",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p11",
      "title": "Exercise for Day 11",
      "description": "Practice the concepts learned in Day 11.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_11_task_1",
        "title": "So sánh Field Injection (@Autowired) vs Constructor Injection",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_11_task_2",
        "title": "Xử lý xung đột injection với @Primary và @Qualifier",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 12,
    "phase": {
      "vi": "Build Tool & Spring Core Architecture",
      "en": "Build Tool and Spring Core Architecture"
    },
    "title": {
      "vi": "Khởi tạo dự án Spring Boot 3",
      "en": "Khởi tạo dự án Spring Boot 3 (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Khởi tạo dự án Spring Boot 3. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Khởi tạo dự án Spring Boot 3. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l12-1",
        "title": {
          "vi": "Khởi tạo project qua Spring Initializr (Java 17/21, Spring Boot 3.x)",
          "en": "Khởi tạo project qua Spring Initializr (Java 17/21, Spring Boot 3.x) (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Khởi tạo project qua Spring Initializr (Java 17/21, Spring Boot 3.x). Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Khởi tạo project qua Spring Initializr (Java 17/21, Spring Boot 3.x). Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Khởi tạo project qua Spring Initializr (Java 17/21, Spring Boot 3.x)\nSystem.out.println(\"Learning day \" + 12);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l12-2",
        "title": {
          "vi": "Cơ chế Auto-Configuration và bản chất của @SpringBootApplication",
          "en": "Cơ chế Auto-Configuration và bản chất của @SpringBootApplication (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Cơ chế Auto-Configuration và bản chất của @SpringBootApplication. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Cơ chế Auto-Configuration và bản chất của @SpringBootApplication. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Cơ chế Auto-Configuration và bản chất của @SpringBootApplication\nSystem.out.println(\"Learning day \" + 12);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v12-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=ZBJ0uLKsFs4",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Khởi tạo dự án Spring Boot 3",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/specs/jvmti.html",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p12",
      "title": "Exercise for Day 12",
      "description": "Practice the concepts learned in Day 12.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_12_task_1",
        "title": "Khởi tạo project qua Spring Initializr (Java 17/21, Spring Boot 3.x)",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_12_task_2",
        "title": "Cơ chế Auto-Configuration và bản chất của @SpringBootApplication",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 13,
    "phase": {
      "vi": "Build Tool & Spring Core Architecture",
      "en": "Build Tool and Spring Core Architecture"
    },
    "title": {
      "vi": "Cấu hình môi trường (Properties/YAML)",
      "en": "Cấu hình môi trường (Properties/YAML) (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Cấu hình môi trường (Properties/YAML). Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Cấu hình môi trường (Properties/YAML). This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l13-1",
        "title": {
          "vi": "Cấu hình qua application.yml/properties, đọc giá trị với @Value",
          "en": "Cấu hình qua application.yml/properties, đọc giá trị với @Value (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Cấu hình qua application.yml/properties, đọc giá trị với @Value. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Cấu hình qua application.yml/properties, đọc giá trị với @Value. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Cấu hình qua application.yml/properties, đọc giá trị với @Value\nSystem.out.println(\"Learning day \" + 13);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l13-2",
        "title": {
          "vi": "Type-safe config với @ConfigurationProperties và quản lý Multi-profiles (dev, prod)",
          "en": "Type-safe config với @ConfigurationProperties và quản lý Multi-profiles (dev, prod) (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Type-safe config với @ConfigurationProperties và quản lý Multi-profiles (dev, prod). Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Type-safe config với @ConfigurationProperties và quản lý Multi-profiles (dev, prod). Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Type-safe config với @ConfigurationProperties và quản lý Multi-profiles (dev, prod)\nSystem.out.println(\"Learning day \" + 13);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v13-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=9SGDpanrc8U",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Cấu hình môi trường (Properties/YAML)",
        "url": "https://spring.io/quickstart",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p13",
      "title": "Exercise for Day 13",
      "description": "Practice the concepts learned in Day 13.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_13_task_1",
        "title": "Cấu hình qua application.yml/properties, đọc giá trị với @Value",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_13_task_2",
        "title": "Type-safe config với @ConfigurationProperties và quản lý Multi-profiles (dev, prod)",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 14,
    "phase": {
      "vi": "RESTful API & Database Access",
      "en": "RESTful API and Database Access"
    },
    "title": {
      "vi": "Xây dựng REST API (Controller Layer)",
      "en": "Xây dựng REST API (Controller Layer) (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Xây dựng REST API (Controller Layer). Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Xây dựng REST API (Controller Layer). This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l14-1",
        "title": {
          "vi": "@RestController, chuẩn URL RESTful và HTTP status codes",
          "en": "@RestController, chuẩn URL RESTful và HTTP status codes (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về @RestController, chuẩn URL RESTful và HTTP status codes. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of @RestController, chuẩn URL RESTful và HTTP status codes. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for @RestController, chuẩn URL RESTful và HTTP status codes\nSystem.out.println(\"Learning day \" + 14);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l14-2",
        "title": {
          "vi": "Bắt tham số request: @PathVariable, @RequestParam, @RequestBody, @RequestHeader",
          "en": "Bắt tham số request: @PathVariable, @RequestParam, @RequestBody, @RequestHeader (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Bắt tham số request: @PathVariable, @RequestParam, @RequestBody, @RequestHeader. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Bắt tham số request: @PathVariable, @RequestParam, @RequestBody, @RequestHeader. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Bắt tham số request: @PathVariable, @RequestParam, @RequestBody, @RequestHeader\nSystem.out.println(\"Learning day \" + 14);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v14-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=EPv9-cHEmPc",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Xây dựng REST API (Controller Layer)",
        "url": "https://docs.spring.io/spring-framework/reference/core/beans.html",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p14",
      "title": "Exercise for Day 14",
      "description": "Practice the concepts learned in Day 14.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_14_task_1",
        "title": "@RestController, chuẩn URL RESTful và HTTP status codes",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_14_task_2",
        "title": "Bắt tham số request: @PathVariable, @RequestParam, @RequestBody, @RequestHeader",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 15,
    "phase": {
      "vi": "RESTful API & Database Access",
      "en": "RESTful API and Database Access"
    },
    "title": {
      "vi": "DTO Pattern & Request Validation",
      "en": "DTO Pattern & Request Validation (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về DTO Pattern & Request Validation. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about DTO Pattern & Request Validation. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l15-1",
        "title": {
          "vi": "Tách biệt Data Transfer Object (DTO) khỏi Domain Entity",
          "en": "Tách biệt Data Transfer Object (DTO) khỏi Domain Entity (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Tách biệt Data Transfer Object (DTO) khỏi Domain Entity. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Tách biệt Data Transfer Object (DTO) khỏi Domain Entity. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Tách biệt Data Transfer Object (DTO) khỏi Domain Entity\nSystem.out.println(\"Learning day \" + 15);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l15-2",
        "title": {
          "vi": "Validation dữ liệu đầu vào với @Valid, @NotNull, @NotBlank, @Size, @Email",
          "en": "Validation dữ liệu đầu vào với @Valid, @NotNull, @NotBlank, @Size, @Email (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Validation dữ liệu đầu vào với @Valid, @NotNull, @NotBlank, @Size, @Email. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Validation dữ liệu đầu vào với @Valid, @NotNull, @NotBlank, @Size, @Email. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Validation dữ liệu đầu vào với @Valid, @NotNull, @NotBlank, @Size, @Email\nSystem.out.println(\"Learning day \" + 15);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v15-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=52sS3g2a96c",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for DTO Pattern & Request Validation",
        "url": "https://docs.spring.io/spring-framework/reference/web/webmvc.html",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p15",
      "title": "Exercise for Day 15",
      "description": "Practice the concepts learned in Day 15.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_15_task_1",
        "title": "Tách biệt Data Transfer Object (DTO) khỏi Domain Entity",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_15_task_2",
        "title": "Validation dữ liệu đầu vào với @Valid, @NotNull, @NotBlank, @Size, @Email",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 16,
    "phase": {
      "vi": "RESTful API & Database Access",
      "en": "RESTful API and Database Access"
    },
    "title": {
      "vi": "Global Exception Handling",
      "en": "Global Exception Handling (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Global Exception Handling. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Global Exception Handling. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l16-1",
        "title": {
          "vi": "Bắt lỗi tập trung với @ControllerAdvice / @RestControllerAdvice và @ExceptionHandler",
          "en": "Bắt lỗi tập trung với @ControllerAdvice / @RestControllerAdvice và @ExceptionHandler (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Bắt lỗi tập trung với @ControllerAdvice / @RestControllerAdvice và @ExceptionHandler. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Bắt lỗi tập trung với @ControllerAdvice / @RestControllerAdvice và @ExceptionHandler. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Bắt lỗi tập trung với @ControllerAdvice / @RestControllerAdvice và @ExceptionHandler\nSystem.out.println(\"Learning day \" + 16);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l16-2",
        "title": {
          "vi": "Chuẩn hóa format response lỗi JSON thống nhất cho Frontend (code, message, timestamp)",
          "en": "Chuẩn hóa format response lỗi JSON thống nhất cho Frontend (code, message, timestamp) (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Chuẩn hóa format response lỗi JSON thống nhất cho Frontend (code, message, timestamp). Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Chuẩn hóa format response lỗi JSON thống nhất cho Frontend (code, message, timestamp). Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Chuẩn hóa format response lỗi JSON thống nhất cho Frontend (code, message, timestamp)\nSystem.out.println(\"Learning day \" + 16);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v16-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=9Xpi45_KqAM",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Global Exception Handling",
        "url": "https://spring.io/guides/tutorials/rest/",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p16",
      "title": "Exercise for Day 16",
      "description": "Practice the concepts learned in Day 16.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_16_task_1",
        "title": "Bắt lỗi tập trung với @ControllerAdvice / @RestControllerAdvice và @ExceptionHandler",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_16_task_2",
        "title": "Chuẩn hóa format response lỗi JSON thống nhất cho Frontend (code, message, timestamp)",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 17,
    "phase": {
      "vi": "RESTful API & Database Access",
      "en": "RESTful API and Database Access"
    },
    "title": {
      "vi": "JDBC & Giới thiệu ORM / Hibernate",
      "en": "JDBC & Giới thiệu ORM / Hibernate (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về JDBC & Giới thiệu ORM / Hibernate. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about JDBC & Giới thiệu ORM / Hibernate. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l17-1",
        "title": {
          "vi": "Hạn chế của JDBC thuần, khái niệm Object-Relational Mapping (ORM)",
          "en": "Hạn chế của JDBC thuần, khái niệm Object-Relational Mapping (ORM) (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Hạn chế của JDBC thuần, khái niệm Object-Relational Mapping (ORM). Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Hạn chế của JDBC thuần, khái niệm Object-Relational Mapping (ORM). Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Hạn chế của JDBC thuần, khái niệm Object-Relational Mapping (ORM)\nSystem.out.println(\"Learning day \" + 17);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l17-2",
        "title": {
          "vi": "Hibernate vai trò JPA Provider: ánh xạ class sang database table",
          "en": "Hibernate vai trò JPA Provider: ánh xạ class sang database table (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Hibernate vai trò JPA Provider: ánh xạ class sang database table. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Hibernate vai trò JPA Provider: ánh xạ class sang database table. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Hibernate vai trò JPA Provider: ánh xạ class sang database table\nSystem.out.println(\"Learning day \" + 17);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v17-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=8SGI_MR9vnI",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for JDBC & Giới thiệu ORM / Hibernate",
        "url": "https://spring.io/projects/spring-data-jpa",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p17",
      "title": "Exercise for Day 17",
      "description": "Practice the concepts learned in Day 17.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_17_task_1",
        "title": "Hạn chế của JDBC thuần, khái niệm Object-Relational Mapping (ORM)",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_17_task_2",
        "title": "Hibernate vai trò JPA Provider: ánh xạ class sang database table",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 18,
    "phase": {
      "vi": "RESTful API & Database Access",
      "en": "RESTful API and Database Access"
    },
    "title": {
      "vi": "Spring Data JPA: Entity & Basic CRUD",
      "en": "Spring Data JPA: Entity & Basic CRUD (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Spring Data JPA: Entity & Basic CRUD. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Spring Data JPA: Entity & Basic CRUD. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l18-1",
        "title": {
          "vi": "Cấu hình JPA Entity: @Entity, @Table, @Id, @GeneratedValue, @Column",
          "en": "Cấu hình JPA Entity: @Entity, @Table, @Id, @GeneratedValue, @Column (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Cấu hình JPA Entity: @Entity, @Table, @Id, @GeneratedValue, @Column. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Cấu hình JPA Entity: @Entity, @Table, @Id, @GeneratedValue, @Column. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Cấu hình JPA Entity: @Entity, @Table, @Id, @GeneratedValue, @Column\nSystem.out.println(\"Learning day \" + 18);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l18-2",
        "title": {
          "vi": "Kế thừa JpaRepository và thực hiện các thao tác CRUD cơ bản",
          "en": "Kế thừa JpaRepository và thực hiện các thao tác CRUD cơ bản (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Kế thừa JpaRepository và thực hiện các thao tác CRUD cơ bản. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Kế thừa JpaRepository và thực hiện các thao tác CRUD cơ bản. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Kế thừa JpaRepository và thực hiện các thao tác CRUD cơ bản\nSystem.out.println(\"Learning day \" + 18);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v18-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=DrsF08m0T_M",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Spring Data JPA: Entity & Basic CRUD",
        "url": "https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p18",
      "title": "Exercise for Day 18",
      "description": "Practice the concepts learned in Day 18.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_18_task_1",
        "title": "Cấu hình JPA Entity: @Entity, @Table, @Id, @GeneratedValue, @Column",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_18_task_2",
        "title": "Kế thừa JpaRepository và thực hiện các thao tác CRUD cơ bản",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 19,
    "phase": {
      "vi": "RESTful API & Database Access",
      "en": "RESTful API and Database Access"
    },
    "title": {
      "vi": "JPA Relationships (Quan hệ dữ liệu)",
      "en": "JPA Relationships (Quan hệ dữ liệu) (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về JPA Relationships (Quan hệ dữ liệu). Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about JPA Relationships (Quan hệ dữ liệu). This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l19-1",
        "title": {
          "vi": "Mapping quan hệ: @OneToMany, @ManyToOne, @JoinColumn",
          "en": "Mapping quan hệ: @OneToMany, @ManyToOne, @JoinColumn (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Mapping quan hệ: @OneToMany, @ManyToOne, @JoinColumn. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Mapping quan hệ: @OneToMany, @ManyToOne, @JoinColumn. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Mapping quan hệ: @OneToMany, @ManyToOne, @JoinColumn\nSystem.out.println(\"Learning day \" + 19);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l19-2",
        "title": {
          "vi": "Phân biệt FetchType (LAZY vs EAGER) và cấu hình CascadeType",
          "en": "Phân biệt FetchType (LAZY vs EAGER) và cấu hình CascadeType (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Phân biệt FetchType (LAZY vs EAGER) và cấu hình CascadeType. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Phân biệt FetchType (LAZY vs EAGER) và cấu hình CascadeType. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Phân biệt FetchType (LAZY vs EAGER) và cấu hình CascadeType\nSystem.out.println(\"Learning day \" + 19);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v19-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=uF_i71EwM6E",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for JPA Relationships (Quan hệ dữ liệu)",
        "url": "https://docs.spring.io/spring-framework/reference/data-access/transaction.html",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p19",
      "title": "Exercise for Day 19",
      "description": "Practice the concepts learned in Day 19.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_19_task_1",
        "title": "Mapping quan hệ: @OneToMany, @ManyToOne, @JoinColumn",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_19_task_2",
        "title": "Phân biệt FetchType (LAZY vs EAGER) và cấu hình CascadeType",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 20,
    "phase": {
      "vi": "RESTful API & Database Access",
      "en": "RESTful API and Database Access"
    },
    "title": {
      "vi": "Custom Query & Derived Query Methods",
      "en": "Custom Query & Derived Query Methods (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Custom Query & Derived Query Methods. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Custom Query & Derived Query Methods. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l20-1",
        "title": {
          "vi": "Derived Queries tự động bằng tên hàm (findBy..., Containing, IsNull)",
          "en": "Derived Queries tự động bằng tên hàm (findBy..., Containing, IsNull) (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Derived Queries tự động bằng tên hàm (findBy..., Containing, IsNull). Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Derived Queries tự động bằng tên hàm (findBy..., Containing, IsNull). Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Derived Queries tự động bằng tên hàm (findBy..., Containing, IsNull)\nSystem.out.println(\"Learning day \" + 20);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l20-2",
        "title": {
          "vi": "Viết query tùy chỉnh với @Query (JPQL vs Native SQL)",
          "en": "Viết query tùy chỉnh với @Query (JPQL vs Native SQL) (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Viết query tùy chỉnh với @Query (JPQL vs Native SQL). Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Viết query tùy chỉnh với @Query (JPQL vs Native SQL). Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Viết query tùy chỉnh với @Query (JPQL vs Native SQL)\nSystem.out.println(\"Learning day \" + 20);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v20-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=7S_tz1z_5bA",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Custom Query & Derived Query Methods",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p20",
      "title": "Exercise for Day 20",
      "description": "Practice the concepts learned in Day 20.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_20_task_1",
        "title": "Derived Queries tự động bằng tên hàm (findBy..., Containing, IsNull)",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_20_task_2",
        "title": "Viết query tùy chỉnh với @Query (JPQL vs Native SQL)",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 21,
    "phase": {
      "vi": "RESTful API & Database Access",
      "en": "RESTful API and Database Access"
    },
    "title": {
      "vi": "Phân trang & Sắp xếp (Pagination & Sorting)",
      "en": "Phân trang & Sắp xếp (Pagination & Sorting) (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Phân trang & Sắp xếp (Pagination & Sorting). Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Phân trang & Sắp xếp (Pagination & Sorting). This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l21-1",
        "title": {
          "vi": "Truyền Pageable, PageRequest và Sort vào repository",
          "en": "Truyền Pageable, PageRequest và Sort vào repository (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Truyền Pageable, PageRequest và Sort vào repository. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Truyền Pageable, PageRequest và Sort vào repository. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Truyền Pageable, PageRequest và Sort vào repository\nSystem.out.println(\"Learning day \" + 21);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l21-2",
        "title": {
          "vi": "Đóng gói response phân trang Page<T> thành payload chuẩn cho client",
          "en": "Đóng gói response phân trang Page<T> thành payload chuẩn cho client (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Đóng gói response phân trang Page<T> thành payload chuẩn cho client. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Đóng gói response phân trang Page<T> thành payload chuẩn cho client. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Đóng gói response phân trang Page<T> thành payload chuẩn cho client\nSystem.out.println(\"Learning day \" + 21);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v21-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=her_7pa0vrg",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Phân trang & Sắp xếp (Pagination & Sorting)",
        "url": "https://spring.io/projects/spring-security",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p21",
      "title": "Exercise for Day 21",
      "description": "Practice the concepts learned in Day 21.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_21_task_1",
        "title": "Truyền Pageable, PageRequest và Sort vào repository",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_21_task_2",
        "title": "Đóng gói response phân trang Page<T> thành payload chuẩn cho client",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 22,
    "phase": {
      "vi": "RESTful API & Database Access",
      "en": "RESTful API and Database Access"
    },
    "title": {
      "vi": "Quản lý Giao dịch (Transaction Management)",
      "en": "Quản lý Giao dịch (Transaction Management) (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Quản lý Giao dịch (Transaction Management). Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Quản lý Giao dịch (Transaction Management). This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l22-1",
        "title": {
          "vi": "Annotation @Transactional và đảm bảo nguyên tắc ACID trong service",
          "en": "Annotation @Transactional và đảm bảo nguyên tắc ACID trong service (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Annotation @Transactional và đảm bảo nguyên tắc ACID trong service. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Annotation @Transactional và đảm bảo nguyên tắc ACID trong service. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Annotation @Transactional và đảm bảo nguyên tắc ACID trong service\nSystem.out.println(\"Learning day \" + 22);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l22-2",
        "title": {
          "vi": "Cơ chế rollback khi gặp unchecked exception và cấu hình rollbackFor",
          "en": "Cơ chế rollback khi gặp unchecked exception và cấu hình rollbackFor (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Cơ chế rollback khi gặp unchecked exception và cấu hình rollbackFor. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Cơ chế rollback khi gặp unchecked exception và cấu hình rollbackFor. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Cơ chế rollback khi gặp unchecked exception và cấu hình rollbackFor\nSystem.out.println(\"Learning day \" + 22);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v22-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=KxqlJblhzfI",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Quản lý Giao dịch (Transaction Management)",
        "url": "https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p22",
      "title": "Exercise for Day 22",
      "description": "Practice the concepts learned in Day 22.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_22_task_1",
        "title": "Annotation @Transactional và đảm bảo nguyên tắc ACID trong service",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_22_task_2",
        "title": "Cơ chế rollback khi gặp unchecked exception và cấu hình rollbackFor",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 23,
    "phase": {
      "vi": "Security, Auth & Deployment",
      "en": "Security, Auth and Deployment"
    },
    "title": {
      "vi": "Spring Security Architecture",
      "en": "Spring Security Architecture (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Spring Security Architecture. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Spring Security Architecture. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l23-1",
        "title": {
          "vi": "Kiến trúc SecurityFilterChain, AuthenticationManager và UserDetailsService",
          "en": "Kiến trúc SecurityFilterChain, AuthenticationManager và UserDetailsService (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Kiến trúc SecurityFilterChain, AuthenticationManager và UserDetailsService. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Kiến trúc SecurityFilterChain, AuthenticationManager và UserDetailsService. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Kiến trúc SecurityFilterChain, AuthenticationManager và UserDetailsService\nSystem.out.println(\"Learning day \" + 23);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l23-2",
        "title": {
          "vi": "Mã hóa mật khẩu an toàn với BCryptPasswordEncoder",
          "en": "Mã hóa mật khẩu an toàn với BCryptPasswordEncoder (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Mã hóa mật khẩu an toàn với BCryptPasswordEncoder. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Mã hóa mật khẩu an toàn với BCryptPasswordEncoder. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Mã hóa mật khẩu an toàn với BCryptPasswordEncoder\nSystem.out.println(\"Learning day \" + 23);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v23-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=Geq60OVyBPg",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Spring Security Architecture",
        "url": "https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p23",
      "title": "Exercise for Day 23",
      "description": "Practice the concepts learned in Day 23.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_23_task_1",
        "title": "Kiến trúc SecurityFilterChain, AuthenticationManager và UserDetailsService",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_23_task_2",
        "title": "Mã hóa mật khẩu an toàn với BCryptPasswordEncoder",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 24,
    "phase": {
      "vi": "Security, Auth & Deployment",
      "en": "Security, Auth and Deployment"
    },
    "title": {
      "vi": "Triển khai Xác thực JWT (JSON Web Token)",
      "en": "JWT Authentication Implementation"
    },
    "description": {
      "vi": "Bảo mật hệ thống bằng Json Web Token (JWT). Học cách sinh token và xác thực request.",
      "en": "Secure the system with Json Web Token (JWT). Learn to generate tokens and authenticate requests."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu cấu trúc của một JWT",
        "Xây dựng JwtService",
        "Tạo Authentication Filter"
      ],
      "en": [
        "Understand JWT structure",
        "Build JwtService",
        "Create Authentication Filter"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "HARD",
    "lessons": [
      {
        "id": "l24-1",
        "title": {
          "vi": "Cấu trúc JWT",
          "en": "JWT Structure"
        },
        "explanation": {
          "vi": "JWT gồm 3 phần: Header, Payload, Signature. Trình duyệt gửi JWT trong Authorization header.",
          "en": "JWT has 3 parts: Header, Payload, Signature. Browsers send it in the Authorization header."
        },
        "keyPoints": [
          "Stateless authentication",
          "Requires a secret key for signature"
        ],
        "codeExample": "Jwts.builder().setSubject(username).signWith(key).compact();",
        "commonMistakes": [
          "Lưu dữ liệu nhạy cảm (mật khẩu) trong payload của JWT"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v24-1",
        "title": "Spring Security JWT",
        "url": "https://www.youtube.com/watch?v=KxqlJblhzfI",
        "duration": "40:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "JWT Introduction",
        "url": "https://jwt.io/introduction",
        "provider": "Auth0",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p24",
      "title": "Implement JWT Filter",
      "description": "Extract token from request and set SecurityContext.",
      "requirements": [
        "Create OncePerRequestFilter",
        "Validate token signature"
      ],
      "hints": [
        "Use SecurityContextHolder"
      ],
      "difficulty": "HARD",
      "estimatedMinutes": 60
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_24_task_1",
        "title": "Viết JwtService tạo và kiểm tra signature của token",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_24_task_2",
        "title": "Tạo JwtAuthenticationFilter chặn mọi request để trích xuất token vào SecurityContext",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 25,
    "phase": {
      "vi": "Security, Auth & Deployment",
      "en": "Security, Auth and Deployment"
    },
    "title": {
      "vi": "Phân quyền người dùng (Role-Based Authorization)",
      "en": "Phân quyền người dùng (Role-Based Authorization) (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Phân quyền người dùng (Role-Based Authorization). Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Phân quyền người dùng (Role-Based Authorization). This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l25-1",
        "title": {
          "vi": "Phân quyền theo URL trong filter chain (requestMatchers, hasRole, hasAuthority)",
          "en": "Phân quyền theo URL trong filter chain (requestMatchers, hasRole, hasAuthority) (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Phân quyền theo URL trong filter chain (requestMatchers, hasRole, hasAuthority). Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Phân quyền theo URL trong filter chain (requestMatchers, hasRole, hasAuthority). Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Phân quyền theo URL trong filter chain (requestMatchers, hasRole, hasAuthority)\nSystem.out.println(\"Learning day \" + 25);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l25-2",
        "title": {
          "vi": "Phân quyền ở method-level bằng annotation @PreAuthorize",
          "en": "Phân quyền ở method-level bằng annotation @PreAuthorize (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Phân quyền ở method-level bằng annotation @PreAuthorize. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Phân quyền ở method-level bằng annotation @PreAuthorize. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Phân quyền ở method-level bằng annotation @PreAuthorize\nSystem.out.println(\"Learning day \" + 25);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v25-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=pTFZFxd4hOI",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Phân quyền người dùng (Role-Based Authorization)",
        "url": "https://docs.docker.com/get-started/",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p25",
      "title": "Exercise for Day 25",
      "description": "Practice the concepts learned in Day 25.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_25_task_1",
        "title": "Phân quyền theo URL trong filter chain (requestMatchers, hasRole, hasAuthority)",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_25_task_2",
        "title": "Phân quyền ở method-level bằng annotation @PreAuthorize",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 26,
    "phase": {
      "vi": "Security, Auth & Deployment",
      "en": "Security, Auth and Deployment"
    },
    "title": {
      "vi": "Cấu hình CORS (Cross-Origin Resource Sharing)",
      "en": "Cấu hình CORS (Cross-Origin Resource Sharing) (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Cấu hình CORS (Cross-Origin Resource Sharing). Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Cấu hình CORS (Cross-Origin Resource Sharing). This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l26-1",
        "title": {
          "vi": "Cơ chế CORS và preflight request (OPTIONS)",
          "en": "Cơ chế CORS và preflight request (OPTIONS) (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Cơ chế CORS và preflight request (OPTIONS). Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Cơ chế CORS và preflight request (OPTIONS). Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Cơ chế CORS và preflight request (OPTIONS)\nSystem.out.println(\"Learning day \" + 26);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l26-2",
        "title": {
          "vi": "Cấu hình Bean CorsConfigurationSource cho phép Frontend gửi JWT và cookie",
          "en": "Cấu hình Bean CorsConfigurationSource cho phép Frontend gửi JWT và cookie (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Cấu hình Bean CorsConfigurationSource cho phép Frontend gửi JWT và cookie. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Cấu hình Bean CorsConfigurationSource cho phép Frontend gửi JWT và cookie. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Cấu hình Bean CorsConfigurationSource cho phép Frontend gửi JWT và cookie\nSystem.out.println(\"Learning day \" + 26);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v26-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=HG6yIjZapSA",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Cấu hình CORS (Cross-Origin Resource Sharing)",
        "url": "https://docs.docker.com/compose/",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p26",
      "title": "Exercise for Day 26",
      "description": "Practice the concepts learned in Day 26.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_26_task_1",
        "title": "Cơ chế CORS và preflight request (OPTIONS)",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_26_task_2",
        "title": "Cấu hình Bean CorsConfigurationSource cho phép Frontend gửi JWT và cookie",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 27,
    "phase": {
      "vi": "Security, Auth & Deployment",
      "en": "Security, Auth and Deployment"
    },
    "title": {
      "vi": "Testing cơ bản với JUnit 5 & Mockito",
      "en": "Testing cơ bản với JUnit 5 & Mockito (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Testing cơ bản với JUnit 5 & Mockito. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Testing cơ bản với JUnit 5 & Mockito. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l27-1",
        "title": {
          "vi": "Viết Unit Test cho Service logic với @Mock, @InjectMocks và Mockito.when()",
          "en": "Viết Unit Test cho Service logic với @Mock, @InjectMocks và Mockito.when() (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Viết Unit Test cho Service logic với @Mock, @InjectMocks và Mockito.when(). Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Viết Unit Test cho Service logic với @Mock, @InjectMocks và Mockito.when(). Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Viết Unit Test cho Service logic với @Mock, @InjectMocks và Mockito.when()\nSystem.out.println(\"Learning day \" + 27);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l27-2",
        "title": {
          "vi": "Test tích hợp API Controller bằng @WebMvcTest và MockMvc",
          "en": "Test tích hợp API Controller bằng @WebMvcTest và MockMvc (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Test tích hợp API Controller bằng @WebMvcTest và MockMvc. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Test tích hợp API Controller bằng @WebMvcTest và MockMvc. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Test tích hợp API Controller bằng @WebMvcTest và MockMvc\nSystem.out.println(\"Learning day \" + 27);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v27-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=R8_veQiYBjI",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Testing cơ bản với JUnit 5 & Mockito",
        "url": "https://docs.github.com/en/actions",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p27",
      "title": "Exercise for Day 27",
      "description": "Practice the concepts learned in Day 27.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_27_task_1",
        "title": "Viết Unit Test cho Service logic với @Mock, @InjectMocks và Mockito.when()",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_27_task_2",
        "title": "Test tích hợp API Controller bằng @WebMvcTest và MockMvc",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 28,
    "phase": {
      "vi": "Security, Auth & Deployment",
      "en": "Security, Auth and Deployment"
    },
    "title": {
      "vi": "Tích hợp API Documentation với Swagger / OpenAPI",
      "en": "Tích hợp API Documentation với Swagger / OpenAPI (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Tích hợp API Documentation với Swagger / OpenAPI. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Tích hợp API Documentation với Swagger / OpenAPI. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l28-1",
        "title": {
          "vi": "Cài đặt thư viện springdoc-openapi-starter-webmvc-ui",
          "en": "Cài đặt thư viện springdoc-openapi-starter-webmvc-ui (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Cài đặt thư viện springdoc-openapi-starter-webmvc-ui. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Cài đặt thư viện springdoc-openapi-starter-webmvc-ui. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Cài đặt thư viện springdoc-openapi-starter-webmvc-ui\nSystem.out.println(\"Learning day \" + 28);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l28-2",
        "title": {
          "vi": "Cấu hình JWT authentication trực tiếp trên giao diện Swagger UI để test API",
          "en": "Cấu hình JWT authentication trực tiếp trên giao diện Swagger UI để test API (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Cấu hình JWT authentication trực tiếp trên giao diện Swagger UI để test API. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Cấu hình JWT authentication trực tiếp trên giao diện Swagger UI để test API. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Cấu hình JWT authentication trực tiếp trên giao diện Swagger UI để test API\nSystem.out.println(\"Learning day \" + 28);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v28-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=jgpVdJB2sKQ",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Tích hợp API Documentation với Swagger / OpenAPI",
        "url": "https://redis.io/docs/",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p28",
      "title": "Exercise for Day 28",
      "description": "Practice the concepts learned in Day 28.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_28_task_1",
        "title": "Cài đặt thư viện springdoc-openapi-starter-webmvc-ui",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_28_task_2",
        "title": "Cấu hình JWT authentication trực tiếp trên giao diện Swagger UI để test API",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 29,
    "phase": {
      "vi": "Security, Auth & Deployment",
      "en": "Security, Auth and Deployment"
    },
    "title": {
      "vi": "Đóng gói Docker Container",
      "en": "Đóng gói Docker Container (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Đóng gói Docker Container. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Đóng gói Docker Container. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l29-1",
        "title": {
          "vi": "Viết Dockerfile multi-stage tối ưu dung lượng ảnh cho Spring Boot jar",
          "en": "Viết Dockerfile multi-stage tối ưu dung lượng ảnh cho Spring Boot jar (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Viết Dockerfile multi-stage tối ưu dung lượng ảnh cho Spring Boot jar. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Viết Dockerfile multi-stage tối ưu dung lượng ảnh cho Spring Boot jar. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Viết Dockerfile multi-stage tối ưu dung lượng ảnh cho Spring Boot jar\nSystem.out.println(\"Learning day \" + 29);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l29-2",
        "title": {
          "vi": "Viết docker-compose.yml khởi chạy đồng thời Spring Boot app và Database",
          "en": "Viết docker-compose.yml khởi chạy đồng thời Spring Boot app và Database (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Viết docker-compose.yml khởi chạy đồng thời Spring Boot app và Database. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Viết docker-compose.yml khởi chạy đồng thời Spring Boot app và Database. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Viết docker-compose.yml khởi chạy đồng thời Spring Boot app và Database\nSystem.out.println(\"Learning day \" + 29);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v29-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=1xo-0gCVhCU",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Đóng gói Docker Container",
        "url": "https://spring.io/microservices",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p29",
      "title": "Exercise for Day 29",
      "description": "Practice the concepts learned in Day 29.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_29_task_1",
        "title": "Viết Dockerfile multi-stage tối ưu dung lượng ảnh cho Spring Boot jar",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_29_task_2",
        "title": "Viết docker-compose.yml khởi chạy đồng thời Spring Boot app và Database",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  },
  {
    "day": 30,
    "phase": {
      "vi": "Security, Auth & Deployment",
      "en": "Security, Auth and Deployment"
    },
    "title": {
      "vi": "Ghép nối Full Stack & Tổng kết",
      "en": "Ghép nối Full Stack & Tổng kết (EN)"
    },
    "description": {
      "vi": "Học chuyên sâu về Ghép nối Full Stack & Tổng kết. Đây là kiến thức cốt lõi dành cho Backend Developer, giúp bạn xây dựng nền tảng vững chắc.",
      "en": "Learn deeply about Ghép nối Full Stack & Tổng kết. This is core knowledge for a Backend Developer to build a solid foundation."
    },
    "prerequisites": [],
    "objectives": {
      "vi": [
        "Hiểu rõ các khái niệm cơ bản",
        "Áp dụng vào thực tế dự án",
        "Tránh các lỗi thường gặp"
      ],
      "en": [
        "Understand basic concepts",
        "Apply in real-world projects",
        "Avoid common mistakes"
      ]
    },
    "estimatedMinutes": 90,
    "difficulty": "BEGINNER",
    "lessons": [
      {
        "id": "l30-1",
        "title": {
          "vi": "Nối toàn bộ REST API Spring Boot vào giao diện Frontend (Login, CRUD, Token refresh)",
          "en": "Nối toàn bộ REST API Spring Boot vào giao diện Frontend (Login, CRUD, Token refresh) (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Nối toàn bộ REST API Spring Boot vào giao diện Frontend (Login, CRUD, Token refresh). Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Nối toàn bộ REST API Spring Boot vào giao diện Frontend (Login, CRUD, Token refresh). Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Nối toàn bộ REST API Spring Boot vào giao diện Frontend (Login, CRUD, Token refresh)\nSystem.out.println(\"Learning day \" + 30);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      },
      {
        "id": "l30-2",
        "title": {
          "vi": "Review toàn diện kiến trúc full stack và kiểm thử end-to-end",
          "en": "Review toàn diện kiến trúc full stack và kiểm thử end-to-end (EN)"
        },
        "explanation": {
          "vi": "Giải thích chi tiết về Review toàn diện kiến trúc full stack và kiểm thử end-to-end. Việc hiểu sâu nguyên lý hoạt động sẽ giúp code tối ưu hơn.",
          "en": "Detailed explanation of Review toàn diện kiến trúc full stack và kiểm thử end-to-end. Understanding internals helps write optimized code."
        },
        "keyPoints": [
          "Khái niệm cốt lõi (Core Concept)",
          "Cách ứng dụng thực tế (Real-world usage)"
        ],
        "codeExample": "// Code example for Review toàn diện kiến trúc full stack và kiểm thử end-to-end\nSystem.out.println(\"Learning day \" + 30);",
        "commonMistakes": [
          "Lạm dụng tính năng mà không hiểu bản chất (Using without understanding)"
        ],
        "resources": []
      }
    ],
    "videos": [
      {
        "id": "v30-1",
        "title": "Spring Boot Masterclass",
        "url": "https://www.youtube.com/watch?v=Ke90Tje7VS0",
        "duration": "10:00",
        "language": "EN",
        "provider": "YouTube",
        "type": "LECTURE"
      }
    ],
    "officialResources": [
      {
        "title": "Official Docs for Ghép nối Full Stack & Tổng kết",
        "url": "https://spring.io/guides",
        "provider": "Official",
        "type": "DOCUMENTATION"
      }
    ],
    "practice": {
      "id": "p30",
      "title": "Exercise for Day 30",
      "description": "Practice the concepts learned in Day 30.",
      "requirements": [
        "Follow the instructions",
        "Write clean code"
      ],
      "hints": [
        "Review the lesson code examples"
      ],
      "difficulty": "MEDIUM",
      "estimatedMinutes": 45
    },
    "outcomes": [],
    "tasks": [
      {
        "id": "day_30_task_1",
        "title": "Nối toàn bộ REST API Spring Boot vào giao diện Frontend (Login, CRUD, Token refresh)",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      },
      {
        "id": "day_30_task_2",
        "title": "Review toàn diện kiến trúc full stack và kiểm thử end-to-end",
        "completed_by": {
          "user_a": false,
          "user_b": false
        },
        "notes": {
          "user_a": "",
          "user_b": ""
        }
      }
    ]
  }
];

export const getLearningModule = (id, topic, phase) => { const match = id.match(/^day-(\d+)/); const day = match ? parseInt(match[1]) : 0; return learningModules.find(m => m.day === day); };