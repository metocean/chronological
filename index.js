// Generated by CoffeeScript 1.9.2
module.exports = function(moment) {
  var every;
  if (moment.every != null) {
    return moment;
  }
  every = function(anchor, count, unit) {
    var res;
    res = {
      nth: function(n) {
        return anchor.clone().add(count * n, unit);
      },
      anchor: anchor,
      count: function(d) {
        var diff;
        diff = d.diff(anchor, unit, true);
        diff /= count;
        return diff;
      },
      after: function(d) {
        var diff;
        diff = d.diff(anchor, unit, true);
        diff /= count;
        diff = Math.ceil(diff);
        return res.nth(diff);
      },
      before: function(d) {
        var diff;
        diff = d.diff(anchor, unit, true);
        diff /= count;
        diff = Math.floor(diff);
        return res.nth(diff);
      },
      next: function(d) {
        var current, next;
        current = res.count(d);
        next = Math.ceil(current);
        if (next === current) {
          next++;
        }
        return next;
      },
      prev: function(d) {
        var current, prev;
        current = res.count(d);
        prev = Math.floor(current);
        if (prev === current) {
          prev--;
        }
        return prev;
      },
      between: function(start, end) {
        var endindex, i, ref, results, startindex;
        if (start.isAfter(end)) {
          ref = [end, start], start = ref[0], end = ref[1];
        }
        startindex = res.next(start);
        endindex = res.prev(end);
        if (startindex > endindex) {
          return [];
        }
        return (function() {
          results = [];
          for (var i = startindex; startindex <= endindex ? i <= endindex : i >= endindex; startindex <= endindex ? i++ : i--){ results.push(i); }
          return results;
        }).apply(this).map(res.nth);
      },
      clone: function() {
        return anchor.clone().every(count, unit);
      },
      forward: function(n) {
        return anchor.add(count * n, unit);
      },
      backward: function(n) {
        return anchor.subtract(count * n, unit);
      },
      timer: function(cb) {
        var target, tick, timeout;
        target = res.next(moment.utc());
        timeout = null;
        tick = function() {
          var mstravel, next, now, target_time;
          now = moment.utc();
          next = res.next(now);
          while (target < next) {
            cb(res.nth(target));
            target++;
          }
          target_time = res.nth(target);
          mstravel = target_time.diff(now, 'ms');
          return timeout = setTimeout(tick, Math.min(60000, mstravel + 1));
        };
        tick();
        return {
          end: function() {
            if (timeout == null) {
              return;
            }
            clearTimeout(timeout);
            return timeout = null;
          }
        };
      }
    };
    return res;
  };
  moment.every = function(count, unit) {
    return every(moment(), count, unit);
  };
  moment.fn.every = function(count, unit) {
    return every(this, count, unit);
  };
  return moment;
};
