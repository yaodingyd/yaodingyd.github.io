---
layout: post
title:  "Relearn Shell"
date:   2018-11-10
---

1. Shell script runs in a subshell and has no access to parent process's environment. So set environment variables by running a shell script doesn't work; `source` it will work.

2. Double quote wil interpolate its context while single quote doesn't.

3. `<< EOF ....  EOF` will pass multi-line content as standard input, for example:

```bash
cat <<EOF
export TEST="test";
alias My=${root}/some/directory;
EOF
```

4. `eval "$(my_func)"` will execute whatever is returned from `my_func`