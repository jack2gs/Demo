"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @Class representing a Wish.
 */
var Wish = (function () {
    function Wish() {
    }
    /**
     * Prints the title of the passed IGiftHolder object.
     * @param giftObj  IGiftHolder object.
     */
    Wish.prototype.printGiftTitle = function (giftObj) {
        return giftObj.title;
    };
    return Wish;
}());
exports.default = Wish;
