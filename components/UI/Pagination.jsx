import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import PrevIcon from "../../assets/images/Prev.svg";
// import NextIcon from "../../assets/images/Next.svg";

const Pagination = ({ currentPage, totalPages, onPageChange, scrollToTop }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      scrollToTop?.(); // Optional: scroll to top after page change
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  const Pages = getPageNumbers();

  return (
    <View className="flex flex-row justify-between" style={styles.wrapper}>
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={[styles.button, currentPage === 1 && styles.disabled]}
        >
          {/* Uncomment below line if you want to use icons */}
          {/* <PrevIcon width={16} height={16} /> */}
          <Text>{"<"}</Text>
        </TouchableOpacity>

        {Pages.map((page, index) =>
          page === "..." ? (
            <Text key={`ellipsis-${index}`} style={styles.ellipsis}>
              ...
            </Text>
          ) : (
            <TouchableOpacity
              key={`page-${page}`}
              onPress={() => handlePageChange(page)}
              style={[
                styles.pageButton,
                page === currentPage && styles.activePage,
              ]}
            >
              <Text
                style={[
                  styles.pageText,
                  page === currentPage && styles.activePageText,
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          )
        )}

        <TouchableOpacity
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={[styles.button, currentPage === totalPages && styles.disabled]}
        >
          {/* <NextIcon width={16} height={16} /> */}
          <Text>{">"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scrollControls}>
        <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
          <Text style={styles.scrollText}>Scroll to Top</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingVertical: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    minWidth: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    backgroundColor: "#fff",
  },
  activePage: {
    backgroundColor: "#3B82F6",
    borderColor: "transparent",
  },
  pageText: {
    color: "#000",
    fontSize: 14,
  },
  activePageText: {
    color: "#fff",
    fontWeight: "bold",
  },
  ellipsis: {
    paddingHorizontal: 6,
    fontSize: 16,
    color: "#3B82F6",
  },
  scrollControls: {
    flexDirection: "row",
    marginTop: 4,
  },
  scrollButton: {
    backgroundColor: "#ddd",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  scrollText: {
    fontSize: 13,
    fontWeight: "500",
  },
});

export default Pagination;

// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import PrevIcon from "../../assets/images/Prev.svg";
// import NextIcon from "../../assets/images/Next.svg";

// const Pagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   scrollToTop,
//   // scrollToBottom,
// }) => {
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page);
//       scrollToTop?.(); // Scroll up on page change (optional)
//     }
//   };

//   const getPageNumbers = () => {
//     const pages = [];

//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       if (currentPage <= 3) {
//         pages.push(1, 2, 3, "...", totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         pages.push(1, "...", currentPage, "...", totalPages);
//       }
//     }

//     return pages;
//   };

//   const Pages = getPageNumbers();

//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.paginationContainer}>
//         <TouchableOpacity
//           onPress={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           style={[styles.button, currentPage === 1 && styles.disabled]}
//         >
//           {/* <PrevIcon width={16} height={16} /> */}
//         </TouchableOpacity>

//         {Pages.map((page, index) =>
//           page === "..." ? (
//             <Text key={`ellipsis-${index}`} style={styles.ellipsis}>
//               ...
//             </Text>
//           ) : (
//             <TouchableOpacity
//               key={`page-${page}`}
//               onPress={() => handlePageChange(page)}
//               style={[
//                 styles.pageButton,
//                 page === currentPage && styles.activePage,
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.pageText,
//                   page === currentPage && styles.activePageText,
//                 ]}
//               >
//                 {page}
//               </Text>
//             </TouchableOpacity>
//           )
//         )}

//         <TouchableOpacity
//           onPress={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           style={[styles.button, currentPage === totalPages && styles.disabled]}
//         >
//           {/* <NextIcon width={16} height={16} /> */}
//         </TouchableOpacity>
//       </View>

//       <View style={styles.scrollControls}>
//         <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
//           <Text style={styles.scrollText}>Scroll to Top</Text>
//         </TouchableOpacity>
//         {/* <TouchableOpacity style={styles.scrollButton} onPress={scrollToBottom}>
//           <Text style={styles.scrollText}>Scroll to Bottom</Text>
//         </TouchableOpacity> */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     alignItems: "center",
//     paddingVertical: 10,
//   },
//   paginationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   button: {
//     backgroundColor: "#ffffff",
//     padding: 8,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#F1F1F1",
//   },
//   disabled: {
//     opacity: 0.5,
//   },
//   pageButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#F1F1F1",
//     backgroundColor: "#fff",
//   },
//   activePage: {
//     backgroundColor: "#3B82F6",
//     borderColor: "transparent",
//   },
//   pageText: {
//     color: "#000",
//     fontSize: 14,
//   },
//   activePageText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   ellipsis: {
//     paddingHorizontal: 6,
//     fontSize: 16,
//     color: "#3B82F6",
//   },
//   scrollControls: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   scrollButton: {
//     backgroundColor: "#ddd",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//   },
//   scrollText: {
//     fontSize: 13,
//     fontWeight: "500",
//   },
// });

// export default Pagination;

// import React from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// import prev from "../../assets/images/Prev.svg";
// import next from "../../assets/images/Next.svg";
// const Pagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   RowsPerPage,
//   Data,
// }) => {
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page);
//     }
//   };

//   const startPage = 1;
//   const totalPages = Data.length / RowsPerPage;
//   const lastPage = totalPages;

//   const getPageNumbers = () => {
//     let pages = [];

//     if (totalPages > 3) {
//       if (currentPage > 3 && currentPage < lastPage - 2) {
//         pages = [
//           startPage,
//           "...",
//           currentPage - 1,
//           currentPage,
//           currentPage + 1,
//           "...",
//           lastPage,
//         ];
//       } else if (currentPage >= lastPage - 3) {
//         pages = [startPage, "...", lastPage - 2, lastPage - 1, lastPage];
//       } else if (currentPage <= 3) {
//         pages = [startPage, 2, 3, 4, "...", lastPage];
//       }
//     } else if (totalPages === 3) {
//       pages = [1, 2, 3];
//     } else if (totalPages === 2) {
//       pages = [1, 2];
//     } else {
//       pages = [1];
//     }

//     return pages;
//   };

//   const Pages = getPageNumbers();

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         style={[styles.button, currentPage === 1 && styles.disabled]}
//       >
//         <Image source={prev} style={styles.icon} />
//       </TouchableOpacity>

//       {Pages.map((page, index) =>
//         page === "..." ? (
//           <Text key={`ellipsis-${index}`} style={styles.ellipsis}>
//             ...
//           </Text>
//         ) : (
//           <TouchableOpacity
//             key={`page-${page}`}
//             onPress={() => handlePageChange(page)}
//             style={[
//               styles.pageButton,
//               page === currentPage && styles.activePage,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.pageText,
//                 page === currentPage && styles.activePageText,
//               ]}
//             >
//               {page}
//             </Text>
//           </TouchableOpacity>
//         )
//       )}

//       <TouchableOpacity
//         onPress={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         style={[styles.button, currentPage === totalPages && styles.disabled]}
//       >
//         <Image source={next} style={styles.icon} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     gap: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   button: {
//     backgroundColor: "#ffffff",
//     padding: 8,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#F1F1F1",
//   },
//   disabled: {
//     opacity: 0.5,
//   },
//   icon: {
//     width: 16,
//     height: 16,
//     resizeMode: "contain",
//   },
//   pageButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#F1F1F1",
//     backgroundColor: "#fff",
//   },
//   activePage: {
//     backgroundColor: "#3B82F6",
//     borderColor: "transparent",
//   },
//   pageText: {
//     color: "#000",
//     fontSize: 14,
//   },
//   activePageText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   ellipsis: {
//     paddingHorizontal: 10,
//     color: "#3B82F6",
//     fontSize: 16,
//   },
// });

// export default Pagination;
