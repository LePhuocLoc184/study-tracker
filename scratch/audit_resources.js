const fs = require('fs');

const path = 'C:\\PTIT_FULL_COURSE\\JAVA_COURSE\\tracker_project\\frontend\\src\\data\\learningModules.js';
let content = fs.readFileSync(path, 'utf8');

const resources = {
  5: { yt: "https://www.youtube.com/watch?v=1XAfapkBQjk", doc: "https://docs.oracle.com/javase/tutorial/essential/exceptions/" },
  6: { yt: "https://www.youtube.com/watch?v=tj5sLSFjVj4", doc: "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html" },
  7: { yt: "https://www.youtube.com/watch?v=t1-YZ6bF-g0", doc: "https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html" },
  8: { yt: "https://www.youtube.com/watch?v=t1-YZ6bF-g0", doc: "https://docs.oracle.com/javase/tutorial/collections/streams/" },
  9: { yt: "https://www.youtube.com/watch?v=W5_W1cI33Lg", doc: "https://docs.oracle.com/javase/tutorial/essential/io/" },
  10: { yt: "https://www.youtube.com/watch?v=TCd8QIS-2KI", doc: "https://docs.oracle.com/javase/tutorial/essential/concurrency/" },
  11: { yt: "https://www.youtube.com/watch?v=Y8ZEK1L2UqY", doc: "https://docs.oracle.com/javase/tutorial/essential/concurrency/highlevel.html" },
  12: { yt: "https://www.youtube.com/watch?v=ZBJ0uLKsFs4", doc: "https://docs.oracle.com/en/java/javase/17/docs/specs/jvmti.html" },
  13: { yt: "https://www.youtube.com/watch?v=9SGDpanrc8U", doc: "https://spring.io/quickstart" },
  14: { yt: "https://www.youtube.com/watch?v=EPv9-cHEmPc", doc: "https://docs.spring.io/spring-framework/reference/core/beans.html" },
  15: { yt: "https://www.youtube.com/watch?v=52sS3g2a96c", doc: "https://docs.spring.io/spring-framework/reference/web/webmvc.html" },
  16: { yt: "https://www.youtube.com/watch?v=9Xpi45_KqAM", doc: "https://spring.io/guides/tutorials/rest/" },
  17: { yt: "https://www.youtube.com/watch?v=8SGI_MR9vnI", doc: "https://spring.io/projects/spring-data-jpa" },
  18: { yt: "https://www.youtube.com/watch?v=DrsF08m0T_M", doc: "https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html" },
  19: { yt: "https://www.youtube.com/watch?v=uF_i71EwM6E", doc: "https://docs.spring.io/spring-framework/reference/data-access/transaction.html" },
  20: { yt: "https://www.youtube.com/watch?v=7S_tz1z_5bA", doc: "https://dev.mysql.com/doc/refman/8.0/en/" },
  21: { yt: "https://www.youtube.com/watch?v=her_7pa0vrg", doc: "https://spring.io/projects/spring-security" },
  22: { yt: "https://www.youtube.com/watch?v=KxqlJblhzfI", doc: "https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html" },
  23: { yt: "https://www.youtube.com/watch?v=Geq60OVyBPg", doc: "https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing" },
  24: { yt: "https://www.youtube.com/watch?v=HsBEn0Ea4k4", doc: "https://site.mockito.org/" },
  25: { yt: "https://www.youtube.com/watch?v=pTFZFxd4hOI", doc: "https://docs.docker.com/get-started/" },
  26: { yt: "https://www.youtube.com/watch?v=HG6yIjZapSA", doc: "https://docs.docker.com/compose/" },
  27: { yt: "https://www.youtube.com/watch?v=R8_veQiYBjI", doc: "https://docs.github.com/en/actions" },
  28: { yt: "https://www.youtube.com/watch?v=jgpVdJB2sKQ", doc: "https://redis.io/docs/" },
  29: { yt: "https://www.youtube.com/watch?v=1xo-0gCVhCU", doc: "https://spring.io/microservices" },
  30: { yt: "https://www.youtube.com/watch?v=Ke90Tje7VS0", doc: "https://spring.io/guides" }
};

// We will replace the "grEKMHGYyns" video and "api/index.html" docs per day
let currentDay = 0;
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const dayMatch = line.match(/"day":\s*(\d+)/);
  if (dayMatch) {
    currentDay = parseInt(dayMatch[1]);
  }

  if (currentDay >= 5) {
    if (line.includes("https://www.youtube.com/watch?v=grEKMHGYyns")) {
      lines[i] = line.replace("https://www.youtube.com/watch?v=grEKMHGYyns", resources[currentDay].yt);
    }
    if (line.includes("https://docs.oracle.com/en/java/javase/17/docs/api/index.html")) {
      lines[i] = line.replace("https://docs.oracle.com/en/java/javase/17/docs/api/index.html", resources[currentDay].doc);
    }
  }
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log("Successfully audited and updated resources.");
